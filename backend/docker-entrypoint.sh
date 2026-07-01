#!/bin/sh
set -e

echo "==> Waiting for database..."
if [ -n "${DATABASE_URL:-}" ] && echo "$DATABASE_URL" | grep -q '^postgresql'; then
  host="${DB_HOST:-db}"
  port="${DB_PORT:-5432}"
  user="${POSTGRES_USER:-new_bank}"
  for attempt in $(seq 1 30); do
    if pg_isready -h "$host" -p "$port" -U "$user" >/dev/null 2>&1; then
      echo "Database ready."
      break
    fi
    echo "  not ready yet (${attempt}/30), retrying..."
    sleep 1
    if [ "$attempt" -eq 30 ]; then
      echo "ERROR: database never became ready."
      exit 1
    fi
  done
else
  echo "Non-Postgres or missing DATABASE_URL — skipping database wait."
fi

echo "==> Starting: $*"
exec "$@"
