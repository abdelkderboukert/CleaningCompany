from apscheduler.schedulers.background import BackgroundScheduler
from api.models import *

def my_task():
    print("Running my task!")
    Employees.objects.all().update(hourjob=0)

scheduler = BackgroundScheduler()
scheduler.add_job(my_task, 'cron', day='1', hour='0', minute='0')
# scheduler.add_job(my_task, 'interval', seconds=1)
scheduler.start()