from sqlalchemy import Boolean, Column, Integer, String
from app.core.database import Base
from sqlalchemy import Enum as SqlEnum

class AdminRole(Base):

    __tablename__ = "admins"

    id = Column(Integer, primary_key=True)

    email = Column(String, unique=True)
    password = Column(String)

    role = Column(default="admin", nullable=False)
    
    is_active = Column(Boolean, default=True)