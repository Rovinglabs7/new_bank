from datetime import UTC, datetime, timedelta

from jose import JWTError, jwt

from app.config import settings


class TokenError(Exception):
    pass


def create_access_token(*, user_id: str, email: str, name: str | None) -> str:
    now = datetime.now(UTC)
    expire = now + timedelta(days=settings.jwt_expire_days)
    payload = {
        "sub": user_id,
        "email": email,
        "name": name,
        "exp": int(expire.timestamp()),
        "iat": int(now.timestamp()),
    }
    return jwt.encode(payload, settings.jwt_secret, algorithm=settings.jwt_algorithm)


def decode_access_token(token: str) -> dict[str, str]:
    try:
        payload = jwt.decode(
            token,
            settings.jwt_secret,
            algorithms=[settings.jwt_algorithm],
        )
    except JWTError as exc:
        raise TokenError("Invalid token") from exc

    user_id = payload.get("sub")
    email = payload.get("email")
    if not user_id or not email:
        raise TokenError("Invalid token payload")

    name = payload.get("name")
    return {
        "sub": user_id,
        "email": email,
        "name": name if isinstance(name, str) else "",
    }
