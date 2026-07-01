from typing import Annotated, Any

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import LeadSubmission
from app.schemas import (
    CareerApplicationRequest,
    DemoRequest,
    LeadSubmissionResponse,
    PartnerApplicationRequest,
    WaitlistRequest,
)

router = APIRouter(prefix="/leads", tags=["leads"])
DbSession = Annotated[Session, Depends(get_db)]


def _save_submission(
    db: Session,
    *,
    kind: str,
    email: str | None,
    payload: dict[str, Any],
) -> LeadSubmissionResponse:
    submission = LeadSubmission(kind=kind, email=email, payload=payload)
    db.add(submission)
    db.commit()
    db.refresh(submission)
    return LeadSubmissionResponse(id=submission.id, ok=True)


@router.post("/waitlist", response_model=LeadSubmissionResponse, status_code=status.HTTP_201_CREATED)
def join_waitlist(payload: WaitlistRequest, db: DbSession) -> LeadSubmissionResponse:
    return _save_submission(
        db,
        kind="waitlist",
        email=payload.email,
        payload={"email": payload.email},
    )


@router.post("/demo", response_model=LeadSubmissionResponse, status_code=status.HTTP_201_CREATED)
def submit_demo(payload: DemoRequest, db: DbSession) -> LeadSubmissionResponse:
    data = payload.model_dump(by_alias=True)
    return _save_submission(
        db,
        kind="demo",
        email=payload.email,
        payload=data,
    )


@router.post("/partner", response_model=LeadSubmissionResponse, status_code=status.HTTP_201_CREATED)
def submit_partner(payload: PartnerApplicationRequest, db: DbSession) -> LeadSubmissionResponse:
    data = payload.model_dump(by_alias=True)
    return _save_submission(
        db,
        kind="partner",
        email=payload.work_email,
        payload=data,
    )


@router.post("/career", response_model=LeadSubmissionResponse, status_code=status.HTTP_201_CREATED)
def submit_career(payload: CareerApplicationRequest, db: DbSession) -> LeadSubmissionResponse:
    data = payload.model_dump(by_alias=True)
    return _save_submission(
        db,
        kind="career",
        email=payload.email,
        payload=data,
    )
