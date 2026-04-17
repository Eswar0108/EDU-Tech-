from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query, UploadFile, File, Form
from sqlalchemy.orm import Session
from datetime import datetime

from app.auth.models import User
from app.core.database import get_db
from app.senior_guide.models import GuideSlot, SeniorGuide
from app.auth.utils import get_current_user
from app.senior_guide.schemas import TestSubmitSchema
from app.services.file_upload import save_file
from app.notifications.service import create_notification


router = APIRouter(prefix="/guides", tags=["Senior Guides"])


# ---------------------------------------------------
# APPLY AS SENIOR GUIDE
# ---------------------------------------------------
@router.post("/apply")
def apply_guide(
    college_name: str = Form(...),
    branch: str = Form(...),
    year_of_study: str = Form(...),
    aadhaar_number: str = Form(...),
    referral_code: Optional[str] = Form(None),

    aadhaar: UploadFile = File(...),
    college_id: UploadFile = File(...),
    hall_ticket: UploadFile = File(...),

    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    # Only seekers can apply
    if user["role"] != "seeker":
        raise HTTPException(403, "Only seekers can apply")

    # Aadhaar validation
    if not aadhaar_number.isdigit() or len(aadhaar_number) != 12:
        raise HTTPException(400, "Invalid Aadhaar number")

    existing = db.query(SeniorGuide).filter(
        SeniorGuide.user_id == user["user_id"]
    ).first()

    # ✅ Already applied case handle
    if existing and existing.status != "REJECTED":
        return {
            "message": "Application already submitted",
            "status": existing.status
        }

    # Referral validation
    if referral_code:
        referrer = db.query(SeniorGuide).filter(
            SeniorGuide.referral_code == referral_code
        ).first()

        if not referrer:
            raise HTTPException(400, "Invalid referral code")

    aadhaar_path = save_file(aadhaar, "aadhaar")
    college_path = save_file(college_id, "college_id")
    hall_path = save_file(hall_ticket, "hall_ticket")

    guide = SeniorGuide(
        user_id=user["user_id"],
        college_name=college_name,
        branch=branch,
        year_of_study=year_of_study,
        aadhaar_number=aadhaar_number,
        aadhaar_path=aadhaar_path,
        college_id_card_path=college_path,
        hall_ticket_path=hall_path,
        referred_by=referral_code,
        referral_paid=False,
        status="PENDING_VERIFICATION",
        attempts=0,
        created_at=datetime.utcnow()
    )

    db.add(guide)
    db.commit()
    db.refresh(guide)

    create_notification(
        db,
        "New Guide Application",
        f"Guide applied: {guide.id}"
    )

    return {
        "message": "Documents submitted successfully",
        "status": guide.status
    }


# ---------------------------------------------------
# TEST QUESTIONS
# ---------------------------------------------------
QUESTIONS = [
    {"id": 1, "question": "Placement percentage?", "answer": "80"},
    {"id": 2, "question": "Faculty experienced?", "answer": "yes"},
    {"id": 3, "question": "Hidden charges present?", "answer": "no"},
    {"id": 4, "question": "Hostel available?", "answer": "yes"},
    {"id": 5, "question": "Attendance strict?", "answer": "yes"},
    {"id": 6, "question": "Internship support available?", "answer": "yes"},
]


# ---------------------------------------------------
# GET TEST QUESTIONS
# ---------------------------------------------------
@router.get("/test/questions")
def get_questions(user=Depends(get_current_user), db: Session = Depends(get_db)):

    guide = db.query(SeniorGuide).filter(
        SeniorGuide.user_id == user["user_id"]
    ).first()

    if not guide:
        raise HTTPException(404, "Guide not found")

    if guide.status != "ELIGIBLE_TEST":
        raise HTTPException(400, "Not eligible")

    return [{"id": q["id"], "question": q["question"]} for q in QUESTIONS]


# ---------------------------------------------------
# SUBMIT TEST
# ---------------------------------------------------
@router.post("/test/submit")
def submit_test(
    data: TestSubmitSchema,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    guide = db.query(SeniorGuide).filter(
        SeniorGuide.user_id == user["user_id"]
    ).first()

    if not guide:
        raise HTTPException(404, "Guide not found")

    if guide.status == "ACTIVE":
        raise HTTPException(400, "Already passed")

    if guide.status == "REJECTED":
        raise HTTPException(400, "Attempts exhausted")

    if guide.status != "ELIGIBLE_TEST":
        raise HTTPException(400, "Not eligible")

    guide.attempts += 1

    answers = {
        "1": data.q1,
        "2": data.q2,
        "3": data.q3,
        "4": data.q4,
        "5": data.q5,
        "6": data.q6
    }

    score = sum(
        1 for q in QUESTIONS
        if answers[str(q["id"])].strip().lower() == q["answer"]
    )

    percentage = (score / len(QUESTIONS)) * 100
    guide.test_score = percentage

    if percentage >= 60:

        guide.status = "ACTIVE"
        guide.unique_id = f"SG-{1000 + guide.id}"
        guide.referral_code = f"REF-SG-{guide.id}"

        guide.wallet_balance = 0
        guide.total_earned = 0

        user_obj = db.query(User).filter(
            User.id == user["user_id"]
        ).first()

        if user_obj:
            user_obj.role = "senior_guide"

        if guide.referred_by:
            referrer = db.query(SeniorGuide).filter(
                SeniorGuide.referral_code == guide.referred_by
            ).first()

            if referrer and not guide.referral_paid:
                referrer.wallet_balance += 25
                referrer.referral_bonus += 25
                guide.referral_paid = True

    elif guide.attempts >= 3:
        guide.status = "REJECTED"

    db.commit()

    return {
        "score": percentage,
        "status": guide.status,
        "attempts": guide.attempts
    }


# ---------------------------------------------------
# GUIDE PROFILE
# ---------------------------------------------------
@router.get("/profile")
def get_profile(
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    guide = db.query(SeniorGuide).filter(
        SeniorGuide.user_id == user["user_id"]
    ).first()

    # if guide not applied yet
    if not guide:
        return {
            "status": "NOT_APPLIED"
        }

    return {
        "unique_id": guide.unique_id,
        "college_name": guide.college_name,
        "branch": guide.branch,
        "year_of_study": guide.year_of_study,
        "rating": guide.rating,
        "total_calls": guide.total_calls,
        "status": guide.status
    }


# ---------------------------------------------------
# UPDATE GUIDE PROFILE
# ---------------------------------------------------
@router.put("/profile/update")
def update_profile(
    branch: str = Form(...),
    year_of_study: str = Form(...),
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    guide = db.query(SeniorGuide).filter(
        SeniorGuide.user_id == user["user_id"]
    ).first()

    if not guide:
        raise HTTPException(404, "Guide not found")

    guide.branch = branch
    guide.year_of_study = year_of_study

    db.commit()

    return {"message": "Profile updated successfully"}


# ---------------------------------------------------
# DASHBOARD SUMMARY
# ---------------------------------------------------
@router.get("/dashboard")
def dashboard(user=Depends(get_current_user), db: Session = Depends(get_db)):

    guide = db.query(SeniorGuide).filter(
        SeniorGuide.user_id == user["user_id"]
    ).first()

    if not guide:
        raise HTTPException(404, "Guide not found")

    return {
        "unique_id": guide.unique_id,
        "status": guide.status,
        "wallet_balance": guide.wallet_balance,
        "rating": guide.rating,
        "total_calls": guide.total_calls,
        "referral_code": guide.referral_code
    }


# ---------------------------------------------------
# EARNINGS SUMMARY
# ---------------------------------------------------
@router.get("/earnings")
def earnings(user=Depends(get_current_user), db: Session = Depends(get_db)):

    guide = db.query(SeniorGuide).filter(
        SeniorGuide.user_id == user["user_id"]
    ).first()

    if not guide:
        raise HTTPException(404, "Guide not found")

    return {
        "wallet_balance": guide.wallet_balance,
        "total_earned": guide.total_earned,
        "referral_bonus": guide.referral_bonus
    }


# ---------------------------------------------------
# GUIDE STATS
# ---------------------------------------------------
@router.get("/stats")
def stats(user=Depends(get_current_user), db: Session = Depends(get_db)):

    guide = db.query(SeniorGuide).filter(
        SeniorGuide.user_id == user["user_id"]
    ).first()

    if not guide:
        raise HTTPException(404, "Guide not found")

    return {
        "total_calls": guide.total_calls,
        "rating": guide.rating,
        "status": guide.status
    }


# ---------------------------------------------------
# REFERRAL STATS
# ---------------------------------------------------
@router.get("/referrals")
def referrals(user=Depends(get_current_user), db: Session = Depends(get_db)):

    guide = db.query(SeniorGuide).filter(
        SeniorGuide.user_id == user["user_id"]
    ).first()

    referrals = db.query(SeniorGuide).filter(
        SeniorGuide.referred_by == guide.referral_code
    ).all()

    return {
        "total_referrals": len(referrals),
        "completed_bonus": sum(1 for r in referrals if r.referral_paid),
        "pending_bonus": sum(1 for r in referrals if not r.referral_paid)
    }


# ---------------------------------------------------
# REFERRAL LIST
# ---------------------------------------------------
@router.get("/referrals/list")
def referral_list(user=Depends(get_current_user), db: Session = Depends(get_db)):

    guide = db.query(SeniorGuide).filter(
        SeniorGuide.user_id == user["user_id"]
    ).first()

    return db.query(SeniorGuide).filter(
        SeniorGuide.referred_by == guide.referral_code
    ).all()

# FIRST this route
@router.get("/my-status")
def my_status(
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    guide = db.query(SeniorGuide).filter(
        SeniorGuide.user_id == user["user_id"]
    ).first()

    if not guide:
        return {"status": "NOT_APPLIED"}

    return {"status": guide.status}


# AFTER that this route
@router.get("/{guide_id}")
def get_guide_profile(
    guide_id: int,
    db: Session = Depends(get_db)
):

    guide = db.query(SeniorGuide).filter(
        SeniorGuide.id == guide_id
    ).first()

    if not guide:
        raise HTTPException(404, "Guide not found")

    return guide


@router.get("/slots/booked")
def get_booked_slots(date: str, db: Session = Depends(get_db)):

    slots = db.query(GuideSlot).filter(
        GuideSlot.status == "BOOKED"
    ).all()

    return [s.time_slot for s in slots]

