from fastapi import APIRouter, Depends, Form, HTTPException
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.auth.utils import get_current_user
from app.core.database import get_db
from app.seeker.models import SeekerProfile
from app.senior_guide.models import SeniorGuide

router = APIRouter(prefix="/seeker", tags=["Seeker"])


@router.get("/profile")
def get_profile(
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    profile = db.query(SeekerProfile).filter(
        SeekerProfile.user_id == user["user_id"]
    ).first()

    if not profile:
        raise HTTPException(404, "Profile not found")

    return profile


# ===============================
# CREATE PROFILE
# ===============================
@router.post("/collegeform")
def college_form(
    college: str = Form(...),
    branch: str = Form(...),
    location: str = Form(...),
    state: str = Form(...),
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    if user["role"] != "seeker":
        raise HTTPException(403, "Only seekers allowed")

    existing_profile = db.query(SeekerProfile).filter(
        SeekerProfile.user_id == user["user_id"]
    ).first()

    if existing_profile:
        raise HTTPException(400, "Profile already exists")

    profile = SeekerProfile(
        user_id=user["user_id"],
        college=college,
        branch=branch,
        location=location,
        state=state
    )

    db.add(profile)
    db.commit()

    return {"message": "Profile created successfully"}


# --------------------------------------
# CREATE / UPDATE SEEKER COLLEGE FORM
# --------------------------------------
from fastapi import Form, Depends, HTTPException
from sqlalchemy.orm import Session

@router.put("/collegeform")
def update_profile(
    location: str = Form(...),
    state: str = Form(...),
    college: str = Form(...),
    branch: str = Form(...),
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    profile = db.query(SeekerProfile).filter(
        SeekerProfile.user_id == user["user_id"]
    ).first()

    if not profile:
        raise HTTPException(404, "Profile not found")

    profile.location = location
    profile.state = state
    profile.college = college
    profile.branch = branch

    db.commit()

    return {"message": "Profile updated successfully"}


@router.get("/guides/search")
def search_guides(college: str, branch: str, db: Session = Depends(get_db)):

    guides = db.query(SeniorGuide).filter(
        func.lower(SeniorGuide.college_name).like(f"%{college.lower()}%"),
        func.lower(SeniorGuide.branch).like(f"%{branch.lower()}%"),
        SeniorGuide.status == "ACTIVE"
    ).all()

    return guides