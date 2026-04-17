from fastapi import APIRouter, Depends, HTTPException, WebSocket, WebSocketDisconnect
from sqlalchemy.orm import Session
from datetime import datetime
from app.core.agora_config import AGORA_APP_ID
from app.core.database import get_db
from app.auth.utils import get_current_user
from app.booking.models import Booking
from app.senior_guide.models import SeniorGuide
from app.calls.models import CallSession
from app.services.agora_service import generate_agora_token
from app.services.referral_service import process_referral_bonus
from .socket import manager

router = APIRouter(prefix="/call", tags=["Call System"])


def verify_booking_access(booking_id: int, user_id: int, db: Session):

    booking = db.query(Booking).filter(
        Booking.id == booking_id
    ).first()

    if not booking:
        raise HTTPException(404, "Booking not found")

    guide = db.query(SeniorGuide).filter(
        SeniorGuide.id == booking.guide_id
    ).first()

    if not guide:
        raise HTTPException(404, "Guide not found")

    if user_id not in [booking.seeker_id, guide.user_id]:
        raise HTTPException(403, "Not allowed")

    return booking, guide


@router.post("/session/create/{booking_id}")
def create_call_session(
    booking_id: int,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    booking, _ = verify_booking_access(
        booking_id,
        user["user_id"],
        db
    )

    if booking.payment_status != "PAID":
        raise HTTPException(400, "Payment incomplete")

    existing = db.query(CallSession).filter(
        CallSession.booking_id == booking_id
    ).first()

    if existing:
        return {"session_id": existing.id}

    session = CallSession(
        booking_id=booking_id,
        status="CREATED"
    )

    db.add(session)
    db.commit()
    db.refresh(session)

    return {"session_id": session.id}

@router.get("/token/{booking_id}")
def get_agora_token(
    booking_id: int,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    booking, _ = verify_booking_access(
        booking_id,
        user["user_id"],
        db
    )

    session = db.query(CallSession).filter(
        CallSession.booking_id == booking_id
    ).first()

    if not session:
        raise HTTPException(404, "Session not found")

    import random

    uid = random.randint(100000, 999999)

    channel = f"booking_{booking_id}"

    token = generate_agora_token(channel, uid)

    return {
        "appId": AGORA_APP_ID,
        "channel": channel,
        "token": token,
        "uid": uid
    }
    
@router.post("/start/{booking_id}")
async def start_call(
    booking_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):

    booking = db.query(Booking).filter(
        Booking.id == booking_id
    ).first()

    if not booking:
        raise HTTPException(404, "Booking not found")

    session = db.query(CallSession).filter(
        CallSession.booking_id == booking_id
    ).first()

    if not session:
        raise HTTPException(404, "Session not found")

    booking.call_status = "STARTED"

    session.status = "STARTED"
    session.start_time = datetime.utcnow()

    db.commit()

    guide = db.query(SeniorGuide).filter(
        SeniorGuide.id == booking.guide_id
    ).first()

    await manager.send_personal_message(
        {"type": "incoming_call", "booking_id": booking.id},
        booking.seeker_id
    )

    await manager.send_personal_message(
        {"type": "incoming_call", "booking_id": booking.id},
        guide.user_id
    )

    return {"message": "Call started"}

@router.post("/end/{booking_id}")
async def end_call(
    booking_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):

    booking = db.query(Booking).filter(
        Booking.id == booking_id
    ).first()

    if not booking:
        raise HTTPException(404, "Booking not found")

    session = db.query(CallSession).filter(
        CallSession.booking_id == booking_id
    ).first()

    if not session:
        raise HTTPException(404, "Session not found")

    booking.call_status = "COMPLETED"
    booking.status = "COMPLETED"

    session.status = "COMPLETED"
    session.end_time = datetime.utcnow()

    db.commit()

    await manager.send_personal_message(
        {"type": "call_ended", "booking_id": booking.id},
        booking.seeker_id
    )

    await manager.send_personal_message(
        {"type": "call_ended", "booking_id": booking.id},
        booking.guide_id
    )

    return {"message": "Call ended"}
@router.post("/cancel/{booking_id}")
def cancel_call(
    booking_id: int,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    booking, _ = verify_booking_access(
        booking_id,
        user["user_id"],
        db
    )

    session = db.query(CallSession).filter(
        CallSession.booking_id == booking_id
    ).first()

    if not session:
        raise HTTPException(404, "Session not found")

    if session.status != "CREATED":
        raise HTTPException(400, "Cannot cancel after start")

    session.status = "CANCELLED"
    booking.status = "CANCELLED"

    db.commit()

    return {"message": "Call cancelled"}


@router.get("/status/{booking_id}")
def call_status(
    booking_id: int,
    db: Session = Depends(get_db)
):

    call = db.query(CallSession).filter(
        CallSession.booking_id == booking_id
    ).first()

    if not call:
        return {"call_status": "NOT_STARTED"}

    return {"call_status": call.status}


@router.websocket("/ws/call/{user_id}")
async def websocket_call(websocket: WebSocket, user_id: int):

    print("WEBSOCKET ROUTE HIT")

    await manager.connect(user_id, websocket)

    try:
        while True:
            await websocket.receive_text()

    except:
        manager.disconnect(user_id)