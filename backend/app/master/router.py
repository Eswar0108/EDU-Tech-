from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.admin.export_router import admin_only
from app.core.database import get_db
from app.master.models import College, Branch, Country, State
from app.master.schemas import (
    CollegeSchema,
    BranchSchema,
    CountrySchema,
    StateSchema
)
from app.auth.utils import get_current_user


router = APIRouter(prefix="/master", tags=["College Master"])


# ===============================
# ADD COUNTRY
# ===============================

@router.post("/country/add")
def add_country(
    data: CountrySchema,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    admin_only(user)

    existing = db.query(Country).filter(
        Country.name.ilike(data.name)
    ).first()

    if existing:
        raise HTTPException(400, "Country already exists")

    country = Country(name=data.name)

    db.add(country)
    db.commit()

    return {"message": "Country added successfully"}


# ===============================
# DELETE COUNTRY
# ===============================

@router.delete("/country/delete/{country_id}")
def delete_country(
    country_id: int,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    admin_only(user)

    state_exists = db.query(State).filter(
        State.country_id == country_id
    ).first()

    if state_exists:
        raise HTTPException(
            400,
            "Cannot delete country with states"
        )

    country = db.query(Country).filter(
        Country.id == country_id
    ).first()

    if not country:
        raise HTTPException(404, "Country not found")

    db.delete(country)
    db.commit()

    return {"message": "Country deleted successfully"}


# ===============================
# GET STATES BY COUNTRY
# ===============================

@router.get("/state/{country_id}")
def get_states_by_country(
    country_id: int,
    db: Session = Depends(get_db)
):

    return db.query(State).filter(
        State.country_id == country_id
    ).all()


# ===============================
# UPDATE STATE
# ===============================

@router.put("/state/update/{state_id}")
def update_state(
    state_id: int,
    data: StateSchema,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    admin_only(user)

    state = db.query(State).filter(
        State.id == state_id
    ).first()

    if not state:
        raise HTTPException(404, "State not found")

    state.name = data.name
    state.country_id = data.country_id

    db.commit()

    return {"message": "State updated successfully"}


# ===============================
# GET COLLEGES BY STATE
# ===============================

@router.get("/college/{state_id}")
def colleges_by_state(
    state_id: int,
    db: Session = Depends(get_db)
):

    return db.query(College).filter(
        College.state_id == state_id
    ).all()


# ===============================
# UPDATE COLLEGE
# ===============================

@router.put("/college/update/{college_id}")
def update_college(
    college_id: int,
    data: CollegeSchema,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    admin_only(user)

    college = db.query(College).filter(
        College.id == college_id
    ).first()

    if not college:
        raise HTTPException(404, "College not found")

    college.name = data.name
    college.country_id = data.country_id
    college.state_id = data.state_id

    db.commit()

    return {"message": "College updated successfully"}


# ===============================
# UPDATE BRANCH
# ===============================

@router.put("/branch/update/{branch_id}")
def update_branch(
    branch_id: int,
    data: BranchSchema,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    admin_only(user)

    branch = db.query(Branch).filter(
        Branch.id == branch_id
    ).first()

    if not branch:
        raise HTTPException(404, "Branch not found")

    branch.name = data.name
    branch.college_id = data.college_id

    db.commit()

    return {"message": "Branch updated successfully"}