from django.urls import path
from .views import *

urlpatterns = [
    path('create/', CreateEmployeeView.as_view(), name='create'),
    path('Employee/', EmployeeView.as_view(), name='employee'),
    path('hourjob/', HourJobView.as_view(), name='hourjob'),
]