# myapp/tasks.py
from celery import shared_task
from datetime import datetime
from .models import Employees

@shared_task
def reset_hours():
    now = datetime.now()
    print("is work bitch")
    if now.day == 1 and now.hour == 0 and now.minute == 0 and now.second == 0:
        Employees.objects.all().update(hour=0)