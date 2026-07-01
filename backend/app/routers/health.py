from fastapi import APIRouter, Response
from sqlalchemy import text

from app.database import engine

router = APIRouter()


@router.get("/health")
def health() -> Response:
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        return Response(
            content='{"status":"ok","service":"sprout-api"}',
            media_type="application/json",
        )
    except Exception:
        return Response(
            content='{"status":"error","service":"sprout-api"}',
            status_code=503,
            media_type="application/json",
        )
