from http import client

from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.limiter import limiter

from app.auth.utils import (
    get_current_user,
    create_token,
    hash_password,
    verify_password
)

from app.admin.schemas import AdminLoginSchema, AdminRegisterSchema
from app.admin.models import AdminRole
from app.admin.permission import role_required
from app.admin.export_router import admin_only

from app.logs.service import create_log
from app.notifications.service import create_notification

from app.senior_guide.models import SeniorGuide
from app.booking.models import Booking
from app.wallet.models import WithdrawalRequest
from app.calls.models import CallSession
from app.auth.models import User


router = APIRouter(prefix="/admin", tags=["Admin Panel"])


# ---------------- ADMIN LOGIN ----------------

@router.post("/login")
@limiter.limit("50/minute")
def admin_login(
    request: Request,
    data: AdminLoginSchema,
    db: Session = Depends(get_db)
):

    admin = db.query(AdminRole).filter(
        AdminRole.email == data.email
    ).first()

    if not admin:
        raise HTTPException(401, "Admin not found")

    if not admin.is_active:
        raise HTTPException(403, "Admin account disabled")

    if not verify_password(data.password, admin.password):
        raise HTTPException(401, "Invalid password")

    token = create_token({
        "user_id": 0,
        "email": admin.email,
        "role": admin.role
    })

    return {
        "message": "Admin login successful",
        "role": admin.role,
        "access_token": token
    }


# ---------------- REGISTER ADMIN ----------------

@router.post("/register")
@limiter.limit("3/minute")
def register_admin(
    request: Request,
    data: AdminRegisterSchema,
    user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    role_required(["SUPERADMIN"])(user)

    existing = db.query(AdminRole).filter(
        AdminRole.email == data.email
    ).first()

    if existing:
        raise HTTPException(400, "Admin already exists")

    new_admin = AdminRole(
        email=data.email,
        password=hash_password(data.password),
        role=data.role,
        is_active=data.is_active
    )

    db.add(new_admin)
    db.commit()

    create_log(
        db,
        user["email"],
        f"Created admin {data.email}",
        "ADMIN_CREATION"
    )

    return {"message": "Admin created successfully"}


# ---------------- GUIDE MANAGEMENT ----------------

@router.get("/guides/pending")
def pending_guides(
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    role_required(["SUPERADMIN"])(user)

    guides = db.query(SeniorGuide).filter(
        SeniorGuide.status == "PENDING_VERIFICATION"
    ).all()

    return guides


@router.put("/guides/approve/{guide_id}")
def approve_guide(
    guide_id: int,
    db: Session = Depends(get_db)
):

    guide = db.query(SeniorGuide).filter(
        SeniorGuide.id == guide_id
    ).first()

    if not guide:
        raise HTTPException(404, "Guide not found")

    guide.status = "ELIGIBLE_TEST"
    guide.is_verified = True

    db.commit()

    return {
        "message": "Documents verified successfully",
        "status": guide.status
    }


@router.put("/guides/reject/{guide_id}")
def reject_guide(guide_id: int, user=Depends(get_current_user), db: Session = Depends(get_db)):

    admin_only(user)

    guide = db.query(SeniorGuide).filter(
        SeniorGuide.id == guide_id
    ).first()

    if not guide:
        raise HTTPException(404, "Guide not found")

    guide.status = "REJECTED"
    db.commit()

    return {"message": "Guide rejected successfully"}


@router.put("/guides/suspend/{guide_id}")
def suspend_guide(guide_id: int, user=Depends(get_current_user), db: Session = Depends(get_db)):

    admin_only(user)

    guide = db.query(SeniorGuide).filter(
        SeniorGuide.id == guide_id
    ).first()

    if not guide:
        raise HTTPException(404, "Guide not found")

    guide.status = "SUSPENDED"
    db.commit()

    return {"message": "Guide suspended successfully"}

@router.put("/guides/pass-test/{guide_id}")
def pass_test(
    guide_id: int,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    role_required(["SUPERADMIN"])(user)

    guide = db.query(SeniorGuide).filter(
        SeniorGuide.id == guide_id
    ).first()

    if not guide:
        raise HTTPException(404, "Guide not found")

    guide.status = "ACTIVE"

    target_user = db.query(User).filter(
        User.id == guide.user_id
    ).first()

    if target_user:
        target_user.role = "senior_guide"

    db.commit()

    return {
        "message": "Guide activated successfully"
    }


@router.put("/guides/reset-attempts/{guide_id}")
def reset_attempts(guide_id: int, user=Depends(get_current_user), db: Session = Depends(get_db)):

    role_required(["SUPERADMIN"])(user)

    guide = db.query(SeniorGuide).filter(
        SeniorGuide.id == guide_id
    ).first()

    if not guide:
        raise HTTPException(404, "Guide not found")

    guide.attempts = 0
    guide.status = "ELIGIBLE_TEST"

    db.commit()

    return {"message": "Attempts reset successfully"}


@router.put("/guides/force-activate/{guide_id}")
def force_activate(guide_id: int, user=Depends(get_current_user), db: Session = Depends(get_db)):

    role_required(["SUPERADMIN"])(user)

    guide = db.query(SeniorGuide).filter(
        SeniorGuide.id == guide_id
    ).first()

    if not guide:
        raise HTTPException(404, "Guide not found")

    guide.status = "ACTIVE"
    db.commit()

    return {"message": "Guide activated manually"}


# ---------------- BOOKINGS & CALLS ----------------

@router.get("/bookings")
def view_bookings(user=Depends(get_current_user), db: Session = Depends(get_db)):
    admin_only(user)
    return db.query(Booking).all()


@router.get("/calls")
def view_calls(user=Depends(get_current_user), db: Session = Depends(get_db)):
    admin_only(user)
    return db.query(CallSession).all()



@router.put("/refund/{booking_id}")
def process_refund(booking_id: int, user=Depends(get_current_user), db: Session = Depends(get_db)):

    admin_only(user)

    booking = db.query(Booking).filter(
        Booking.id == booking_id
    ).first()

    if not booking:
        raise HTTPException(404, "Booking not found")

    booking.payment_status = "REFUNDED"

    db.commit()

    return {"message": "Refund processed successfully"}


# ---------------- WITHDRAW MANAGEMENT ----------------

@router.get("/withdraw/requests")
def withdrawal_requests(user=Depends(get_current_user), db: Session = Depends(get_db)):
    admin_only(user)
    return db.query(WithdrawalRequest).filter(
        WithdrawalRequest.status == "PENDING"
    ).all()


@router.put("/withdraw/approve/{request_id}")
def approve_withdrawal(request_id: int, user=Depends(get_current_user), db: Session = Depends(get_db)):

    admin_only(user)

    withdrawal = db.query(WithdrawalRequest).filter(
        WithdrawalRequest.id == request_id
    ).first()

    if not withdrawal:
        raise HTTPException(404, "Request not found")

    withdrawal.status = "APPROVED"

    guide = db.query(SeniorGuide).filter(
        SeniorGuide.id == withdrawal.guide_id
    ).first()

    if guide:
        guide.pending_withdrawal -= withdrawal.amount

    db.commit()

    return {"message": "Withdrawal approved"}


@router.put("/withdraw/reject/{request_id}")
def reject_withdrawal(request_id: int, user=Depends(get_current_user), db: Session = Depends(get_db)):

    admin_only(user)

    withdrawal = db.query(WithdrawalRequest).filter(
        WithdrawalRequest.id == request_id
    ).first()

    if not withdrawal:
        raise HTTPException(404, "Request not found")

    withdrawal.status = "REJECTED"

    guide = db.query(SeniorGuide).filter(
        SeniorGuide.id == withdrawal.guide_id
    ).first()

    if guide:
        guide.wallet_balance += withdrawal.amount
        guide.pending_withdrawal -= withdrawal.amount

    db.commit()

    return {"message": "Withdrawal rejected"}


# ---------------- USER CONTROL ----------------

@router.put("/users/suspend/{user_id}")
def suspend_user(user_id: int, user=Depends(get_current_user), db: Session = Depends(get_db)):

    admin_only(user)

    target = db.query(User).filter(User.id == user_id).first()

    if not target:
        raise HTTPException(404, "User not found")

    target.is_active = False
    db.commit()

    return {"message": "User suspended"}


@router.put("/users/activate/{user_id}")
def activate_user(user_id: int, user=Depends(get_current_user), db: Session = Depends(get_db)):

    admin_only(user)

    target = db.query(User).filter(User.id == user_id).first()

    if not target:
        raise HTTPException(404, "User not found")

    target.is_active = True
    db.commit()

    return {"message": "User activated"}


# ---------------- ANALYTICS ----------------

@router.get("/analytics")
def admin_analytics(user=Depends(get_current_user), db: Session = Depends(get_db)):

    admin_only(user)

    completed_calls = db.query(CallSession).filter(
        CallSession.status == "COMPLETED"
    ).count()

    return {
        "total_users": db.query(User).count(),
        "total_guides": db.query(SeniorGuide).count(),
        "active_guides": db.query(SeniorGuide).filter(
            SeniorGuide.status == "ACTIVE"
        ).count(),
        "total_bookings": db.query(Booking).count(),
        "completed_calls": completed_calls,
        "total_revenue": completed_calls * 44,
        "pending_withdrawals": db.query(WithdrawalRequest).filter(
            WithdrawalRequest.status == "PENDING"
        ).count()
    }


# ---------------- ADMIN DASHBOARD SUMMARY ----------------

@router.get("/dashboard")
def admin_dashboard(user=Depends(get_current_user), db: Session = Depends(get_db)):

    admin_only(user)

    return {
        "users": db.query(User).count(),
        "guides": db.query(SeniorGuide).count(),
        "bookings": db.query(Booking).count(),
        "withdraw_requests": db.query(WithdrawalRequest).filter(
            WithdrawalRequest.status == "PENDING"
        ).count()
    }


# ---------------- FINANCE SUMMARY ----------------

@router.get("/finance/revenue-summary")
def revenue_summary(user=Depends(get_current_user), db: Session = Depends(get_db)):

    role_required(["SUPERADMIN", "FINANCIAL_ADMIN"])(user)

    completed_calls = db.query(CallSession).filter(
        CallSession.status == "COMPLETED"
    ).count()

    return {
        "total_completed_calls": completed_calls,
        "platform_revenue": completed_calls * 44,
        "guide_payout": completed_calls * 55
    }


