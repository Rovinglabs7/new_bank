#!/usr/bin/env bash
# Blue-green deploy for Next.js (web) + FastAPI (api) on a single VPS.
# Cloudflare Workers remain the dev/staging frontend; this script is production only.
#
# Usage:
#   ./deploy.sh --init              First deploy (starts db + blue slots)
#   ./deploy.sh                     Auto-detect changes since last deploy
#   ./deploy.sh --frontend          Force frontend deploy only
#   ./deploy.sh --backend           Force backend deploy only
#   ./deploy.sh --all               Force both
#   ./deploy.sh --status            Show active slots and health
#   ./deploy.sh --diagnose          Debug 502 / upstream mismatches
#   ./deploy.sh --fix               Recover: restart active slots, rewrite upstream

set -euo pipefail

COMPOSE_FILE="docker-compose.yml"
STATE_FILE=".deploy-state"
REVISION_FILE=".deploy-revision"
HOST_UPSTREAM="nginx/host-upstream.conf"
PROJECT_NAME="${COMPOSE_PROJECT_NAME:-new-bank}"

WEB_BLUE_PORT="${WEB_BLUE_PORT:-8004}"
WEB_GREEN_PORT="${WEB_GREEN_PORT:-8005}"
API_BLUE_PORT="${API_BLUE_PORT:-8006}"
API_GREEN_PORT="${API_GREEN_PORT:-8007}"

SITE_HOST="${SITE_HOST:-example.com}"
API_HOST="${API_HOST:-api.example.com}"
WEB_HEALTH_PATH="${WEB_HEALTH_PATH:-/api/health}"
API_HEALTH_PATH="${API_HEALTH_PATH:-/health}"

DEPLOY_FRONTEND=false
DEPLOY_BACKEND=false
FORCE_INIT=false
MODE="deploy"

compose() {
  docker compose -f "$COMPOSE_FILE" -p "$PROJECT_NAME" "$@"
}

container_name() {
  local service="$1" slot="$2"
  echo "${PROJECT_NAME}-${service}-${slot}"
}

read_state() {
  local key="$1" default="${2:-blue}"
  if [ -f "$STATE_FILE" ]; then
    local val
    val=$(grep -E "^${key}=" "$STATE_FILE" 2>/dev/null | tail -1 | cut -d= -f2- || true)
    if [ -n "$val" ]; then
      echo "$val"
      return
    fi
  fi
  echo "$default"
}

write_state() {
  local web_slot="$1" api_slot="$2"
  cat >"$STATE_FILE" <<EOF
WEB=${web_slot}
API=${api_slot}
EOF
}

inactive_slot() {
  if [ "$1" = "blue" ]; then echo "green"; else echo "blue"; fi
}

web_port_for_slot() {
  if [ "$1" = "blue" ]; then echo "$WEB_BLUE_PORT"; else echo "$WEB_GREEN_PORT"; fi
}

api_port_for_slot() {
  if [ "$1" = "blue" ]; then echo "$API_BLUE_PORT"; else echo "$API_GREEN_PORT"; fi
}

write_host_upstream() {
  local web_port="$1" api_port="$2"
  mkdir -p "$(dirname "$HOST_UPSTREAM")"
  cat >"$HOST_UPSTREAM" <<EOF
# Active backends — swapped by deploy.sh (host nginx includes this file)
upstream ${PROJECT_NAME}_web {
    server 127.0.0.1:${web_port};
    keepalive 32;
}

upstream ${PROJECT_NAME}_api {
    server 127.0.0.1:${api_port};
    keepalive 32;
}
EOF
  echo "Wrote ${HOST_UPSTREAM} (web→${web_port}, api→${api_port})"
}

reload_nginx() {
  if command -v nginx >/dev/null 2>&1; then
    if nginx -t 2>/dev/null; then
      systemctl reload nginx 2>/dev/null || service nginx reload 2>/dev/null || nginx -s reload 2>/dev/null || true
      echo "Nginx reloaded."
    else
      echo "WARN: nginx -t failed — reload skipped. Fix config and run: sudo nginx -t && sudo systemctl reload nginx"
    fi
  else
    echo "nginx not found on PATH — upstream file updated; reload nginx manually on the host."
  fi
}

wait_healthy() {
  local container="$1" max="${2:-120}"
  echo "Waiting for ${container} to become healthy..."
  local elapsed=0
  while [ "$elapsed" -lt "$max" ]; do
    local status
    status=$(docker inspect --format='{{if .State.Health}}{{.State.Health.Status}}{{else}}none{{end}}' "$container" 2>/dev/null || echo "missing")
    if [ "$status" = "healthy" ]; then
      echo "${container} is healthy."
      return 0
    fi
    if [ "$status" = "missing" ]; then
      echo "ERROR: container ${container} not found."
      return 1
    fi
    sleep 2
    elapsed=$((elapsed + 2))
  done
  echo "ERROR: ${container} did not become healthy within ${max}s."
  docker logs --tail 50 "$container" 2>/dev/null || true
  return 1
}

verify_web_health() {
  local port="$1"
  local body
  body=$(curl -sf -H "Host: ${SITE_HOST}" "http://127.0.0.1:${port}${WEB_HEALTH_PATH}" || return 1)
  [ "$body" = "ok" ]
}

verify_api_health() {
  local port="$1"
  curl -sf -H "Host: ${API_HOST}" "http://127.0.0.1:${port}${API_HEALTH_PATH}" | grep -q '"status"[[:space:]]*:[[:space:]]*"ok"'
}

run_db_init() {
  echo "==> Ensuring database schema (SQLAlchemy create_all)..."
  compose run --rm --no-deps --entrypoint "" api-blue python -c "from app.database import init_db; init_db()"
}

detect_changes() {
  DEPLOY_FRONTEND=false
  DEPLOY_BACKEND=false

  local base=""
  if [ -f "$REVISION_FILE" ]; then
    base=$(cat "$REVISION_FILE")
  fi

  if [ -z "$base" ]; then
    echo "No ${REVISION_FILE} — treating as first deploy (both services)."
    DEPLOY_FRONTEND=true
    DEPLOY_BACKEND=true
    return
  fi

  if ! git cat-file -e "${base}^{commit}" 2>/dev/null; then
    echo "WARN: ${REVISION_FILE} points to missing commit — deploying both."
    DEPLOY_FRONTEND=true
    DEPLOY_BACKEND=true
    return
  fi

  local files
  files=$(git diff --name-only "$base" HEAD 2>/dev/null || true)
  if [ -z "$files" ]; then
    echo "No file changes since last deploy (${base:0:8})."
    return
  fi

  echo "Changes since ${base:0:8}:"
  echo "$files" | sed 's/^/  /'

  local frontend_re='^(app/|components/|lib/|public/|styles/|config/|hooks/|context/|custom/|scripts/|package\.json|package-lock\.json|next\.config\.ts|tsconfig\.json|Dockerfile$)'
  local backend_re='^backend/'
  local infra_re='^(docker-compose\.yml|deploy\.sh|nginx/|\.dockerignore$)'

  while IFS= read -r f; do
    [ -z "$f" ] && continue
    if [[ "$f" =~ $frontend_re ]]; then DEPLOY_FRONTEND=true; fi
    if [[ "$f" =~ $backend_re ]]; then DEPLOY_BACKEND=true; fi
    if [[ "$f" =~ $infra_re ]]; then DEPLOY_FRONTEND=true; DEPLOY_BACKEND=true; fi
  done <<<"$files"
}

deploy_web_slot() {
  local target_slot="$1"
  local service="web-${target_slot}"
  local container
  container=$(container_name "web" "$target_slot")
  local port
  port=$(web_port_for_slot "$target_slot")

  echo "==> Building and starting ${service} on port ${port}..."
  compose build "$service"
  compose up -d --no-deps "$service"

  wait_healthy "$container" 150
  verify_web_health "$port" || { echo "ERROR: web health check failed on port ${port}"; return 1; }

  local active_web
  active_web=$(read_state WEB blue)
  write_host_upstream "$port" "$(api_port_for_slot "$(read_state API blue)")"
  reload_nginx

  if [ "$active_web" != "$target_slot" ] && docker ps -a --format '{{.Names}}' | grep -qx "$(container_name web "$active_web")"; then
    echo "Stopping old web slot: web-${active_web}"
    compose stop "web-${active_web}" || true
  fi

  write_state "$target_slot" "$(read_state API blue)"
  echo "Web cutover complete — active slot: ${target_slot} (port ${port})"
}

deploy_api_slot() {
  local target_slot="$1"
  local service="api-${target_slot}"
  local container
  container=$(container_name "api" "$target_slot")
  local port
  port=$(api_port_for_slot "$target_slot")

  echo "==> Building and starting ${service} on port ${port}..."
  compose build "$service"
  compose up -d --no-deps "$service"

  wait_healthy "$container" 90
  verify_api_health "$port" || { echo "ERROR: api health check failed on port ${port}"; return 1; }

  local active_api
  active_api=$(read_state API blue)
  write_host_upstream "$(web_port_for_slot "$(read_state WEB blue)")" "$port"
  reload_nginx

  if [ "$active_api" != "$target_slot" ] && docker ps -a --format '{{.Names}}' | grep -qx "$(container_name api "$active_api")"; then
    echo "Stopping old api slot: api-${active_api}"
    compose stop "api-${active_api}" || true
  fi

  write_state "$(read_state WEB blue)" "$target_slot"
  echo "API cutover complete — active slot: ${target_slot} (port ${port})"
}

cmd_init() {
  echo "==> Initial production deploy"
  if [ ! -f .env ]; then
    echo "ERROR: .env missing. Copy .env.production.example to .env and edit values."
    exit 1
  fi

  compose up -d db
  run_db_init

  echo "==> Starting blue slots..."
  compose build web-blue api-blue
  compose up -d web-blue api-blue

  wait_healthy "$(container_name web blue)" 150
  wait_healthy "$(container_name api blue)" 90
  verify_web_health "$WEB_BLUE_PORT"
  verify_api_health "$API_BLUE_PORT"

  write_state "blue" "blue"
  write_host_upstream "$WEB_BLUE_PORT" "$API_BLUE_PORT"
  reload_nginx

  git rev-parse HEAD >"$REVISION_FILE"
  echo "Init complete. Active: web=blue (${WEB_BLUE_PORT}), api=blue (${API_BLUE_PORT})"
}

cmd_deploy() {
  if [ ! -f "$STATE_FILE" ]; then
    echo "ERROR: No ${STATE_FILE}. Run ./deploy.sh --init first."
    exit 1
  fi

  if [ "$DEPLOY_FRONTEND" = false ] && [ "$DEPLOY_BACKEND" = false ]; then
    echo "Nothing to deploy."
    exit 0
  fi

  compose up -d db

  if [ "$DEPLOY_BACKEND" = true ]; then
    run_db_init
    local active_api target_api
    active_api=$(read_state API blue)
    target_api=$(inactive_slot "$active_api")
    deploy_api_slot "$target_api"
  fi

  if [ "$DEPLOY_FRONTEND" = true ]; then
    local active_web target_web
    active_web=$(read_state WEB blue)
    target_web=$(inactive_slot "$active_web")
    deploy_web_slot "$target_web"
  fi

  git rev-parse HEAD >"$REVISION_FILE"
  echo "Deploy finished at $(git rev-parse --short HEAD)"
}

cmd_status() {
  local web_slot api_slot
  web_slot=$(read_state WEB blue)
  api_slot=$(read_state API blue)
  echo "Project:     ${PROJECT_NAME}"
  echo "Web slot:    ${web_slot} (port $(web_port_for_slot "$web_slot"))"
  echo "API slot:    ${api_slot} (port $(api_port_for_slot "$api_slot"))"
  echo "Revision:    $(cat "$REVISION_FILE" 2>/dev/null || echo 'none')"
  echo ""
  compose ps
  echo ""
  if [ -f "$HOST_UPSTREAM" ]; then
    echo "--- ${HOST_UPSTREAM} ---"
    cat "$HOST_UPSTREAM"
  fi
}

cmd_diagnose() {
  cmd_status
  echo ""
  local web_slot api_slot
  web_slot=$(read_state WEB blue)
  api_slot=$(read_state API blue)
  echo "--- curl checks ---"
  echo -n "web: "; verify_web_health "$(web_port_for_slot "$web_slot")" && echo OK || echo FAIL
  echo -n "api: "; verify_api_health "$(api_port_for_slot "$api_slot")" && echo OK || echo FAIL
}

cmd_fix() {
  echo "==> Fix mode: ensure active slots are running and upstream matches state"
  local web_slot api_slot
  web_slot=$(read_state WEB blue)
  api_slot=$(read_state API blue)

  compose up -d db
  compose up -d "web-${web_slot}" "api-${api_slot}"

  wait_healthy "$(container_name web "$web_slot")" 150 || true
  wait_healthy "$(container_name api "$api_slot")" 90 || true

  write_host_upstream "$(web_port_for_slot "$web_slot")" "$(api_port_for_slot "$api_slot")"
  reload_nginx
  echo "Fix complete."
}

# --- parse args ---
while [ $# -gt 0 ]; do
  case "$1" in
    --init)       FORCE_INIT=true; MODE="init" ;;
    --frontend)   DEPLOY_FRONTEND=true; DEPLOY_BACKEND=false; MODE="deploy" ;;
    --backend)    DEPLOY_BACKEND=true; DEPLOY_FRONTEND=false; MODE="deploy" ;;
    --all)        DEPLOY_FRONTEND=true; DEPLOY_BACKEND=true; MODE="deploy" ;;
    --status)     MODE="status" ;;
    --diagnose)   MODE="diagnose" ;;
    --fix)        MODE="fix" ;;
    -h|--help)
      sed -n '2,12p' "$0"
      exit 0
      ;;
    *)
      echo "Unknown option: $1"
      exit 1
      ;;
  esac
  shift
done

cd "$(dirname "$0")"

if [ -f .env ]; then
  set -a
  # shellcheck disable=SC1091
  source .env
  set +a
fi

case "$MODE" in
  init)
    cmd_init
    ;;
  status)
    cmd_status
    ;;
  diagnose)
    cmd_diagnose
    ;;
  fix)
    cmd_fix
    ;;
  deploy)
    if [ "$DEPLOY_FRONTEND" = false ] && [ "$DEPLOY_BACKEND" = false ]; then
      detect_changes
    fi
    cmd_deploy
    ;;
esac
