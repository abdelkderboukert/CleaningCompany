from django.urls import path
from .views import *

urlpatterns = [
    path('create/', CreateEmployeeView.as_view(), name='create'),
    path('Employee/', EmployeeView.as_view(), name='employee'),
    path('hourjob/', HourJobView.as_view(), name='hourjob'),
    path('export_to_excel/', export_to_excel_view, name='export_to_excel'),
]