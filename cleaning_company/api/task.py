from apscheduler.schedulers.background import BackgroundScheduler
from api.models import *
import datetime
import time
from openpyxl import Workbook
from django.db.models import Q

def my_task():
    print("Running my task!")
    Employees.objects.all().update(hourjob=0)

def export_to_excel():
    # Get the current date and time
    now = datetime.datetime.now()

    # Create a new Excel workbook
    wb = Workbook()

    # Get the active worksheet
    ws = wb.active

    # Set the header row
    ws['A1'] = 'Employee ID'
    ws['B1'] = 'Name'
    ws['C1'] = 'Salary'
    ws['D1'] = 'Hour'
    ws['E1'] = 'Hour Job'

    # Get the data from the database
    employees = Employees.objects.all()

    # Iterate over the data and write it to the worksheet
    for i, employee in enumerate(employees, start=2):
        ws[f'A{i}'] = employee.id
        ws[f'B{i}'] = employee.name
        ws[f'C{i}'] = employee.salary
        ws[f'D{i}'] = employee.hour
        ws[f'E{i}'] = employee.hourjob

    # Specify the path where you want to save the file
    folder_path = 'C:\Users\HP\rebo\CleaningCompany\cleaning_company\ExcelFile'
    filename = f'{folder_path}/employees_{now.strftime("%Y-%m")}.xlsx'

    # Save the workbook to a file
    wb.save(filename)

    # Return the filename
    return filename

scheduler = BackgroundScheduler()
scheduler.add_job(my_task, 'cron', day='1', hour='0', minute='0')
scheduler.add_job(export_to_excel, 'cron', day='1', hour='0', minute='0')
scheduler.start()

while True:
    time.sleep(1)