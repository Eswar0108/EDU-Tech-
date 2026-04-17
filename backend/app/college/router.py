from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel, Field

from app.core.database import get_db
from app.auth.utils import get_current_user
from app.college.models import CollegeFeedback
from app.booking.models import Booking
from app.calls.models import CallSession
from app.senior_guide.models import SeniorGuide
from app.auth.models import User
from app.services.summary_service import generate_summary_pdf
from app.email.email_service import send_report_email


router = APIRouter(
    prefix="/college-feedback",
    tags=["College Feedback"]
)


# ===============================
# SCHEMA
# ===============================

class FeedbackSchema(BaseModel):

    faculty_rating: int = Field(..., ge=1, le=5)
    placement_rating: int = Field(..., ge=1, le=5)
    infrastructure_rating: int = Field(..., ge=1, le=5)

    hidden_fees: str
    strict_attendance: str
    ragging_situation: str
    comments: str


# ===============================
# SUBMIT FEEDBACK
# ===============================

@router.post("/submit/{booking_id}")
def submit_feedback(
    booking_id: int,
    data: FeedbackSchema,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    booking = db.query(Booking).filter(
        Booking.id == booking_id
    ).first()

    if not booking:
        raise HTTPException(404, "Booking not found")

    if booking.status != "COMPLETED":
        raise HTTPException(400, "Booking not completed yet")

    call_session = db.query(CallSession).filter(
        CallSession.booking_id == booking_id,
        CallSession.status == "COMPLETED"
    ).first()

    if not call_session:
        raise HTTPException(400, "Call not completed yet")

    guide = db.query(SeniorGuide).filter(
        SeniorGuide.id == booking.guide_id
    ).first()

    if not guide:
        raise HTTPException(404, "Guide not found")

    if guide.user_id != user["user_id"]:
        raise HTTPException(403, "Only guide can submit feedback")

    existing = db.query(CollegeFeedback).filter(
        CollegeFeedback.booking_id == booking_id
    ).first()

    if existing:
        raise HTTPException(400, "Feedback already submitted")

    feedback = CollegeFeedback(
        booking_id=booking_id,
        guide_id=guide.id,
        faculty_rating=data.faculty_rating,
        placement_rating=data.placement_rating,
        infrastructure_rating=data.infrastructure_rating,
        hidden_fees=data.hidden_fees,
        strict_attendance=data.strict_attendance,
        ragging_situation=data.ragging_situation,
        comments=data.comments
    )

    db.add(feedback)
    db.commit()

    # ===============================
    # UPDATE GUIDE RATING
    # ===============================

    all_feedback = db.query(CollegeFeedback).filter(
        CollegeFeedback.guide_id == guide.id
    ).all()

    avg_rating = sum(
        f.faculty_rating +
        f.placement_rating +
        f.infrastructure_rating
        for f in all_feedback
    ) / (len(all_feedback) * 3)

    guide.rating = round(avg_rating, 2)

    db.commit()

    # ===============================
    # GENERATE SUMMARY PDF
    # ===============================

    pdf_path = generate_summary_pdf(booking_id, db)

    seeker = db.query(User).filter(
        User.id == booking.seeker_id
    ).first()

    if seeker:
        send_report_email(seeker.email, pdf_path)

    return {
        "message": "Feedback submitted successfully",
        "summary_sent": True
    }


# ===============================
# FEEDBACK STATUS
# ===============================

@router.get("/status/{booking_id}")
def feedback_status(
    booking_id: int,
    db: Session = Depends(get_db)
):

    feedback = db.query(CollegeFeedback).filter(
        CollegeFeedback.booking_id == booking_id
    ).first()

    return {
        "submitted": bool(feedback)
    }


# ===============================
# REPORT DOWNLOAD CHECK
# ===============================

@router.get("/report/{booking_id}")
def report_available(
    booking_id: int,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    booking = db.query(Booking).filter(
        Booking.id == booking_id,
        Booking.seeker_id == user["user_id"]
    ).first()

    if not booking:
        raise HTTPException(404, "Booking not found")

    feedback = db.query(CollegeFeedback).filter(
        CollegeFeedback.booking_id == booking_id
    ).first()

    if not feedback:
        raise HTTPException(404, "Report not generated yet")

    return {
        "message": "Report ready",
        "booking_id": booking_id
    }


# ===============================
# ADMIN VIEW ALL FEEDBACK
# ===============================

@router.get("/admin/all")
def admin_all_feedback(
    db: Session = Depends(get_db)
):

    return db.query(CollegeFeedback).all()