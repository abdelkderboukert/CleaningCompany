from apscheduler.schedulers.background import BackgroundScheduler
from .models import *

def my_task():
    print("Running my task!")
    # code to run every 60 seconds

scheduler = BackgroundScheduler()
# scheduler.add_job(my_task, 'cron', day='1', hour='0', minute='0')
scheduler.add_job(my_task, 'interval', seconds=10)
scheduler.start()