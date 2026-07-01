# Praevor API (FastAPI)

Standalone authentication and business API for Praevor. Runs separately from the Next.js site so database credentials and password hashing never live on the frontend.

## Setup

```bash
cd backend
python -m venv .venv

# Windows
.venv\Scripts\activate

# macOS/Linux
source .venv/bin/activate

pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 4000
```

API: http://localhost:4000  
Docs: http://localhost:4000/docs

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |
| POST | `/auth/register` | Create account + business |
| POST | `/auth/login` | Sign in with email/password |
| GET | `/auth/me` | Current user (`Authorization: Bearer <token>`) |

## Environment

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | SQLAlchemy URL (`sqlite:///./dev.db` or Postgres) |
| `JWT_SECRET` | Signs session tokens — must match frontend `JWT_SECRET` |
| `CORS_ORIGIN` | Allowed browser origins (comma-separated) |

## Production

Deploy to its own host (e.g. `api.praevor.com`). Use Postgres instead of SQLite. Store secrets in your host's secret manager.
