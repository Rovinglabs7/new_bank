from pydantic import BaseModel, ConfigDict, EmailStr, Field


class BusinessOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    name: str
    country: str


class UserOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    email: EmailStr
    name: str | None = None
    business: BusinessOut | None = None


class AuthResponse(BaseModel):
    token: str
    user: UserOut


class RegisterRequest(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    business_name: str = Field(alias="businessName", min_length=1, max_length=200)
    email: EmailStr
    country: str = Field(min_length=2, max_length=2)
    password: str = Field(min_length=8, max_length=128)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1)


class MeResponse(BaseModel):
    user: UserOut
