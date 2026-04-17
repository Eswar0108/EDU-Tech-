from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Float, DateTime
from datetime import datetime
from app.core.database import Base


from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime
from app.core.database import Base


class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True)
    seeker_id = Column(Integer, ForeignKey("users.id"))
    guide_id = Column(Integer, ForeignKey("senior_guides.id"))
    time_slot = Column(String)
    reminder_30_sent = Column(Boolean, default=False)
    reminder_5_sent = Column(Boolean, default=False)
    status = Column(String, default="CONFIRMED")
    payment_status = Column(String, default="PENDING")
    created_at = Column(DateTime, default=datetime.utcnow)
    



class RefundRequest(Base):
    __tablename__ = "refund_requests"

    id = Column(Integer, primary_key=True, index=True)

    booking_id = Column(
        Integer,
        ForeignKey("bookings.id"),
        nullable=False
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    reason = Column(String, nullable=False)

    status = Column(
        String,
        default="PENDING"
    )  # PENDING / APPROVED / REJECTED

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )