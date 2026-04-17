# app/auth/service.py

import random
from datetime import datetime, timedelta


def generate_otp():
    return str(random.randint(100000, 999999))


def set_otp(user):
    otp = generate_otp()
    user.otp = otp
    user.otp_expires_at = datetime.utcnow() + timedelta(minutes=5)
    return otp