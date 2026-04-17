from ics import Calendar, Event
from datetime import datetime


def create_calendar_invite(
    title,
    description,
    start_time,
    end_time,
    location="Online Call",
    file_path="invite.ics"
):

    calendar = Calendar()

    event = Event()
    event.name = title
    event.begin = start_time
    event.end = end_time
    event.description = description
    event.location = location

    calendar.events.add(event)

    with open(file_path, "w") as f:
        f.writelines(calendar)

    return file_path