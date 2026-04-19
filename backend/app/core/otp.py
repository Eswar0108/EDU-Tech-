import os
import random

otp_store = {}

def generate_otp():
    if os.getenv("DEV_OTP"):
        return os.getenv("DEV_OTP")
    return str(random.randint(100000, 999999))


def save_otp(email, otp):
    otp_store[email] = otp


def verify_otp(email, otp):
    return otp_store.get(email) == otp