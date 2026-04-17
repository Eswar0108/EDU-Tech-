from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.orm import Session

from app.notifications.service import create_notification
from app.core.database import get_db
from app.wallet.models import Referral, WithdrawalRequest
from app.senior_guide.models import SeniorGuide
from app.auth.utils import get_current_user


router = APIRouter(prefix="/wallet", tags=["Wallet"])


# ---------------------------------------------------
# GET WALLET BALANCE
# ---------------------------------------------------
# ---------------------------------------------------
# ADMIN VIEW ALL WITHDRAWAL REQUESTS
# ---------------------------------------------------

@router.get("/admin/all-requests")
def all_requests(
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    if user["role"] not in ["SUPERADMIN", "FINANCIAL_ADMIN"]:
        raise HTTPException(403, "Admin access required")

    return db.query(WithdrawalRequest).all()


# ---------------------------------------------------
# ADMIN APPROVE WITHDRAWAL
# ---------------------------------------------------

@router.post("/admin/approve/{withdraw_id}")
def approve_withdrawal(
    withdraw_id: int,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    if user["role"] not in ["SUPERADMIN", "FINANCIAL_ADMIN"]:
        raise HTTPException(403, "Admin access required")

    withdraw = db.query(WithdrawalRequest).filter(
        WithdrawalRequest.id == withdraw_id
    ).first()

    if not withdraw:
        raise HTTPException(404, "Request not found")

    if withdraw.status != "PENDING":
        raise HTTPException(400, "Already processed")

    guide = db.query(SeniorGuide).filter(
        SeniorGuide.id == withdraw.guide_id
    ).first()

    # ✅ deduct wallet AFTER approval
    guide.wallet_balance -= withdraw.amount
    guide.pending_withdrawal -= withdraw.amount

    withdraw.status = "APPROVED"

    db.commit()

    return {"message": "Withdrawal approved"}

# ---------------------------------------------------
# ADMIN REJECT WITHDRAWAL
# ---------------------------------------------------

@router.post("/admin/reject/{withdraw_id}")
def reject_withdrawal(
    withdraw_id: int,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    if user["role"] not in ["SUPERADMIN", "FINANCIAL_ADMIN"]:
        raise HTTPException(403, "Admin access required")

    withdraw = db.query(WithdrawalRequest).filter(
        WithdrawalRequest.id == withdraw_id
    ).first()

    if not withdraw:
        raise HTTPException(404, "Request not found")

    if withdraw.status != "PENDING":
        raise HTTPException(400, "Already processed")

    guide = db.query(SeniorGuide).filter(
        SeniorGuide.id == withdraw.guide_id
    ).first()

    withdraw.status = "REJECTED"

    guide.wallet_balance += withdraw.amount
    guide.pending_withdrawal -= withdraw.amount

    db.commit()

    return {"message": "Withdrawal rejected"}


# ---------------------------------------------------
# WALLET TRANSACTION HISTORY
# ---------------------------------------------------

# ---------------------------------------------------
# WALLET TRANSACTION HISTORY
# ---------------------------------------------------

from app.wallet.models import WalletTransaction


@router.get("/transactions")
def transaction_history(
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    if user["role"] != "senior_guide":

        raise HTTPException(403, "Access denied")

    guide = db.query(SeniorGuide).filter(

        SeniorGuide.user_id == user["user_id"]

    ).first()

    credits = db.query(WalletTransaction).filter(

        WalletTransaction.guide_id == guide.id

    ).all()

    withdrawals = db.query(WithdrawalRequest).filter(

        WithdrawalRequest.guide_id == guide.id

    ).all()

    result = []

    for c in credits:

        result.append({

            "id": c.id,

            "amount": c.amount,

            "type": "credit",

            "created_at": c.created_at

        })

    for w in withdrawals:

        result.append({

            "id": w.id,

            "amount": w.amount,

            "type": "debit",

            "status": w.status,

            "created_at": w.created_at

        })

    return sorted(
        result,
        key=lambda x: x["created_at"],
        reverse=True
    )
@router.get("/balance")
def get_wallet_balance(
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    if user["role"] != "senior_guide":
        raise HTTPException(403, "Access denied")

    guide = db.query(SeniorGuide).filter(
        SeniorGuide.user_id == user["user_id"]
    ).first()

    if not guide:
        raise HTTPException(404, "Guide not found")

    return {
        "wallet_balance": guide.wallet_balance,
        "pending_withdrawal": guide.pending_withdrawal
    }
    
    
# ---------------------------------------------------
# GUIDE CREATE WITHDRAW REQUEST
# ---------------------------------------------------

@router.post("/withdraw/request")
def create_withdraw_request(
    amount: float = Body(...),
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    if user["role"] != "senior_guide":
        raise HTTPException(403, "Only guides can withdraw")

    guide = db.query(SeniorGuide).filter(
        SeniorGuide.user_id == user["user_id"]
    ).first()

    if not guide:
        raise HTTPException(404, "Guide not found")

    if amount <= 0:
        raise HTTPException(400, "Invalid amount")

    if guide.wallet_balance < amount:
        raise HTTPException(400, "Insufficient balance")

    # ✅ DO NOT deduct wallet_balance here
    guide.pending_withdrawal += amount

    withdraw = WithdrawalRequest(
        guide_id=guide.id,
        amount=amount,
        status="PENDING"
    )

    db.add(withdraw)
    db.commit()

    return {"message": "Withdrawal request submitted"}

import razorpay
import os
client = razorpay.Client(
    auth=(os.getenv("RAZORPAY_KEY_ID"),
          os.getenv("RAZORPAY_KEY_SECRET"))
)




from fastapi import Body
import hmac
import hashlib




from fastapi import Body, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.auth.utils import get_current_user
from app.senior_guide.models import SeniorGuide
from app.wallet.models import WalletTransaction



import hmac
import hashlib



# CREATE ORDER

from fastapi import Body, HTTPException
from pydantic import BaseModel
import razorpay
from app.core.config import RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET


class OrderRequest(BaseModel):
    amount: float


client = razorpay.Client(
    auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET)
)


@router.post("/add-money/order")
def create_wallet_order(data: OrderRequest = Body(...)):

    amount = data.amount

    if amount <= 0:
        raise HTTPException(status_code=400, detail="Invalid amount")

    order = client.order.create({
        "amount": int(amount * 100),
        "currency": "INR",
        "payment_capture": 1
    })

    return {
        "order_id": order["id"],
        "amount": order["amount"],
        "currency": order["currency"]
    }


# VERIFY PAYMENT

@router.post("/add-money/verify")
def verify_wallet_payment(
    data: dict = Body(...),
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    generated_signature = hmac.new(

        os.getenv("RAZORPAY_KEY_SECRET").encode(),

        f"{data['razorpay_order_id']}|{data['razorpay_payment_id']}".encode(),

        hashlib.sha256

    ).hexdigest()


    if generated_signature != data["razorpay_signature"]:
        raise HTTPException(400, "Invalid signature")


    guide = db.query(SeniorGuide).filter(
        SeniorGuide.user_id == user["user_id"]
    ).first()


    if not guide:
        raise HTTPException(404, "Guide not found")


    payment = client.payment.fetch(
        data["razorpay_payment_id"]
    )


    amount = payment["amount"] / 100


    guide.wallet_balance += amount


    tx = WalletTransaction(
        guide_id=guide.id,
        amount=amount,
        type="credit"
    )


    db.add(tx)
    db.commit()


    return {
        "message": "Wallet updated successfully",
        "amount_added": amount
    }  

# GENERATE REFERRAL CODE

@router.get("/my-code")
def get_referral_code(
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    guide = db.query(SeniorGuide).filter(
        SeniorGuide.user_id == user["user_id"]
    ).first()

    if not guide:
        raise HTTPException(404, "Guide not found")

    return {
        "referral_code": f"GUIDE{guide.id}"
    }


@router.post("/apply/{code}")
def apply_referral(
    code: str,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    try:
        guide_id = int(code.replace("GUIDE", ""))

    except:
        raise HTTPException(400, "Invalid code")

    guide = db.query(SeniorGuide).filter(
        SeniorGuide.id == guide_id
    ).first()

    if not guide:
        raise HTTPException(404, "Guide not found")


    # prevent self referral

    if guide.user_id == user["user_id"]:
        raise HTTPException(400, "Cannot use your own code")


    # prevent multiple usage by same user

    already_used = db.query(Referral).filter(
        Referral.referred_user_id == user["user_id"]
    ).first()

    if already_used:
        raise HTTPException(400, "Referral already used")


    reward = 25


    guide.wallet_balance += reward


    tx = WalletTransaction(
        guide_id=guide.id,
        amount=reward,
        type="credit"
    )


    referral = Referral(
        referrer_id=guide.id,
        referred_user_id=user["user_id"],
        amount=reward
    )


    db.add(tx)
    db.add(referral)

    db.commit()


    return {
        "message": "Referral reward credited",
        "amount": reward
    }
# REFERRAL STATS

@router.get("/stats")
def referral_stats(
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    guide = db.query(SeniorGuide).filter(
        SeniorGuide.user_id == user["user_id"]
    ).first()

    total = db.query(Referral).filter(
        Referral.referrer_id == guide.id
    ).count()

    earnings = total * 25

    return {

        "total_referrals": total,
        "total_earnings": earnings

    }
    
