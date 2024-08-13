# api/apps.py

from django.apps import AppConfig


class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'
    def ready(self):
        from .task import my_task, export_to_excel
        my_task()
        # export_to_excel()