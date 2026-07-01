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


class LeadSubmissionResponse(BaseModel):
    id: str
    ok: bool = True


class WaitlistRequest(BaseModel):
    email: EmailStr


class DemoRequest(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    email: EmailStr
    first_name: str = Field(alias="firstName", min_length=1, max_length=120)
    last_name: str = Field(alias="lastName", min_length=1, max_length=120)
    company: str = Field(min_length=1, max_length=200)
    website: str | None = Field(default=None, max_length=500)
    size: str = Field(min_length=1, max_length=50)
    volume: str = Field(min_length=1, max_length=50)
    interests: list[str] = Field(default_factory=list)


class PartnerApplicationRequest(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    full_name: str = Field(alias="fullName", min_length=1, max_length=200)
    work_email: EmailStr = Field(alias="workEmail")
    company_name: str = Field(alias="companyName", min_length=1, max_length=200)
    company_website: str = Field(alias="companyWebsite", min_length=1, max_length=500)
    integration: str = Field(min_length=1, max_length=5000)
    user_count: str = Field(alias="userCount", min_length=1, max_length=100)


class CareerApplicationRequest(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    full_name: str = Field(alias="fullName", min_length=1, max_length=200)
    email: EmailStr
    role: str = Field(min_length=1, max_length=200)
    linkedin: str = Field(min_length=1, max_length=500)
    github: str | None = Field(default=None, max_length=500)
    video: str = Field(min_length=1, max_length=500)
    about_you: str = Field(alias="aboutYou", min_length=1, max_length=5000)
    offer: str = Field(min_length=1, max_length=5000)
    why_praevor: str = Field(alias="whyPraevor", min_length=1, max_length=5000)
