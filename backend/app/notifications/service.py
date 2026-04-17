from app.notifications.models import Notification
from app.notifications.ws_manager import manager


async def create_notification(db, title, message):

    notification = Notification(
        title=title,
        message=message
    )

    db.add(notification)
    db.commit()

    await manager.broadcast(f"{title}: {message}")