from django.urls import path
from .views import *

urlpatterns = [
    path('create/', CreateEmployeeView.as_view(), name='create'),
    path('Employee/', EmployeeView.as_view(), name='employee'),
    path('hourjob/', HourJobView.as_view(), name='hourjob'),
    path('todo/', TodoView.as_view({'get': 'list', 'post': 'create'}), name='todo_list'),
    path('todo/<int:pk>/', TodoView.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='todo_detail'),
    path('export_to_excel/', export_to_excel_view, name='export_to_excel'),
    path('attendance/', AttendanceView.as_view(), name='attendance_list'),
]