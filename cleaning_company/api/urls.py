from django.urls import path
from .views import *

urlpatterns = [
    path('Employee/', EmployeeView.as_view(), name='employee'),
    path('hourjob/', HourJobView.as_view(), name='hourjob'),
]