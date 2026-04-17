import smtplib
from email.mime.text import MIMEText
from email.message import EmailMessage
from app.core.config import EMAIL_USER, EMAIL_PASS


# -------------------------
# SEND OTP EMAIL
# -------------------------
def send_email(to_email: str, otp: str):

    try:
        msg = MIMEText(f"Your OTP is {otp}. Valid for 5 minutes.")

        msg["Subject"] = "OTP Verification"
        msg["From"] = EMAIL_USER
        msg["To"] = to_email

        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(EMAIL_USER, EMAIL_PASS)
            server.send_message(msg)

        print("✅ OTP Email sent successfully")
        return True

    except Exception as e:
        print("❌ Email error:", e)
        return False


# -------------------------
# SEND REPORT EMAIL (PDF)
# -------------------------
def send_report_email(to_email: str, file_path: str):

    try:
        msg = EmailMessage()

        msg["Subject"] = "Your College Consultation Report"
        msg["From"] = EMAIL_USER
        msg["To"] = to_email

        msg.set_content(
            "Your consultation report is attached. Please review carefully."
        )

        with open(file_path, "rb") as f:
            file_data = f.read()

        msg.add_attachment(
            file_data,
            maintype="application",
            subtype="pdf",
            filename="report.pdf"
        )

        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(EMAIL_USER, EMAIL_PASS)
            server.send_message(msg)

        print("✅ Report email sent successfully")
        return True

    except Exception as e:
        print("❌ Report email error:", e)
        return False


# -------------------------
# SEND CALENDAR INVITE
# -------------------------
def send_calendar_invite(to_email: str, ics_file: str):

    try:
        msg = EmailMessage()

        msg["Subject"] = "Consultation Call Reminder"
        msg["From"] = EMAIL_USER
        msg["To"] = to_email

        msg.set_content(
            "Your consultation session is scheduled. Calendar invite attached."
        )

        with open(ics_file, "rb") as f:
            msg.add_attachment(
                f.read(),
                maintype="text",
                subtype="calendar",
                filename="invite.ics"
            )

        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(EMAIL_USER, EMAIL_PASS)
            server.send_message(msg)

        print("✅ Calendar invite sent successfully")
        return True

    except Exception as e:
        print("❌ Calendar email error:", e)
        return False