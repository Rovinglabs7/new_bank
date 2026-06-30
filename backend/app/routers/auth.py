from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload

from app.auth.jwt import create_access_token
from app.auth.passwords import hash_password, verify_password
from app.database import get_db
from app.deps import get_current_user
from app.models import Business, User
from app.schemas import AuthResponse, LoginRequest, MeResponse, RegisterRequest, UserOut

router = APIRouter(prefix="/auth", tags=["auth"])
DbSession = Annotated[Session, Depends(get_db)]


def _auth_response(user: User) -> AuthResponse:
    token = create_access_token(
        user_id=user.id,
        email=user.email,
        name=user.name,
    )
    return AuthResponse(token=token, user=UserOut.model_validate(user))


@router.post("/register", response_model=AuthResponse)
def register(payload: RegisterRequest, db: DbSession) -> AuthResponse:
    existing = db.query(User).filter(User.email == payload.email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email already exists",
        )

    user = User(
        email=payload.email,
        name=payload.business_name,
        password_hash=hash_password(payload.password),
        business=Business(
            name=payload.business_name,
            country=payload.country,
        ),
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    user = (
        db.query(User)
        .options(joinedload(User.business))
        .filter(User.id == user.id)
        .one()
    )
    return _auth_response(user)


@router.post("/login", response_model=AuthResponse)
def login(payload: LoginRequest, db: DbSession) -> AuthResponse:
    user = (
        db.query(User)
        .options(joinedload(User.business))
        .filter(User.email == payload.email)
        .first()
    )

    if user is None or not user.password_hash:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    if not verify_password(payload.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    return _auth_response(user)


@router.get("/me", response_model=MeResponse)
def me(user: Annotated[User, Depends(get_current_user)]) -> MeResponse:
    return MeResponse(user=UserOut.model_validate(user))
