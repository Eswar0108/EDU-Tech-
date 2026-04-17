from fastapi import APIRouter, Depends, HTTPException, Body, Request
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from typing import Optional

from app.auth.utils import create_token, get_current_user
from app.core.database import get_db
from app.auth.models import User
from app.senior_guide.models import SeniorGuide
from app.core.limiter import limiter
from app.auth.schemas import LoginSchema, RegisterSchema, OTPVerifySchema
from app.core.otp import generate_otp
from app.email.email_service import send_email


router = APIRouter(prefix="/auth", tags=["Authentication"])


# REGISTER
@router.post("/register")
@limiter.limit("3/minute")
def register(request: Request, data: RegisterSchema, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(User.email == data.email).first()

    if existing_user:
        raise HTTPException(400, "User already exists")

    otp = generate_otp()

    new_user = User(
        full_name=data.full_name,
        email=data.email,
        mobile_number=data.mobile_number,
        role=data.role if data.role else "seeker",
        otp=otp,
        is_verified=False,
        otp_expiry=datetime.utcnow() + timedelta(minutes=5)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    send_email(data.email, otp)

    return {"message": "OTP sent successfully"}


# LOGIN
@router.post("/login")
@limiter.limit("5/minute")
def login(request: Request, data: LoginSchema, db: Session = Depends(get_db)):

    user = (
    db.query(User)
    .filter(User.email == data.email, User.is_verified == True)
    .first()
)

    if not user:
        raise HTTPException(404, "User not found")

    if not user.is_verified:
        raise HTTPException(403, "User registration not completed")

    otp = generate_otp()

    user.otp = otp
    user.otp_expiry = datetime.utcnow() + timedelta(minutes=5)

    db.commit()

    send_email(user.email, otp)

    return {"message": "OTP sent for login"}



@router.post("/verify-otp")
def verify_otp(
    data: OTPVerifySchema,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.email == data.email
    ).first()

    if not user:
        raise HTTPException(404, "User not found")

    if user.otp != data.otp:
        raise HTTPException(400, "Invalid OTP")

    if user.otp_expiry < datetime.utcnow():
        raise HTTPException(400, "OTP expired")


    guide = db.query(SeniorGuide).filter(
        SeniorGuide.user_id == user.id
    ).first()


    guide_status = guide.status if guide else None
    guide_id = guide.id if guide else None


    # ✅ role update automatically
    role = user.role

    if guide:

        if guide.status == "ACTIVE":
            role = "senior_guide"

        elif guide.status == "ELIGIBLE_TEST":
            role = "seeker"

        elif guide.status == "PENDING_VERIFICATION":
            role = "seeker"


    user.is_verified = True
    user.otp = None
    user.otp_expiry = None

    db.commit()


    token = create_token({
        "user_id": user.id,
        "email": user.email,
        "role": role
    })


    return {
        "message": "successful",
        "access_token": token,
        "token_type": "bearer",
        "role": role,
        "guide_status": guide_status,
        "guide_id": guide_id,
        "user_id": user.id
    }

# RESEND OTP
@router.post("/resend-otp")
def resend_otp(email: str = Body(...), db: Session = Depends(get_db)):

    user = db.query(User).filter(User.email == email).first()

    if not user:
        raise HTTPException(404, "User not found")

    if user.otp_expiry and user.otp_expiry > datetime.utcnow():
        raise HTTPException(400, "OTP already sent. Try later")

    otp = generate_otp()

    user.otp = otp
    user.otp_expiry = datetime.utcnow() + timedelta(minutes=5)

    db.commit()

    send_email(email, otp)

    return {"message": "OTP resent successfully"}


# PROFILE
@router.get("/me")
def get_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    if current_user.role == "seeker":

        return {
            "user_id": current_user.id,
            "role": current_user.role
        }

    if current_user.role == "senior_guide":

        guide_profile = db.query(SeniorGuide).filter(
            SeniorGuide.user_id == current_user.id
        ).first()

        if not guide_profile:
            raise HTTPException(404, "Guide profile not found")

        return {
            "sg_unique_id": guide_profile.unique_id,
            "college": guide_profile.college_name,
            "branch": guide_profile.branch,
            "year": guide_profile.year_of_study,
            "rating": guide_profile.rating,
            "calls_completed": guide_profile.total_calls
        }