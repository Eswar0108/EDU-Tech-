from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from app.core.database import Base





class WalletTransaction(Base):
    __tablename__ = "wallet_transactions"

    id = Column(Integer, primary_key=True)

    guide_id = Column(Integer, ForeignKey("senior_guides.id"))

    amount = Column(Integer)

    type = Column(String)
    # CALL_EARNING / REFERRAL / WITHDRAW

    booking_id = Column(Integer, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)



class WithdrawalRequest(Base):

    __tablename__ = "withdraw_requests"

    id = Column(Integer, primary_key=True)

    guide_id = Column(Integer, ForeignKey("senior_guides.id"))

    amount = Column(Integer)

    status = Column(String, default="PENDING")
    # PENDING / APPROVED / REJECTED

    created_at = Column(DateTime, default=datetime.utcnow)
    
    

class Referral(Base):

    __tablename__ = "referrals"

    id = Column(Integer, primary_key=True)

    referrer_id = Column(Integer, ForeignKey("senior_guides.id"))

    referred_user_id = Column(Integer)

    amount = Column(Integer, default=25)

    created_at = Column(DateTime, default=datetime.utcnow)
    
