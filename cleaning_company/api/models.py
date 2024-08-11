from django.db import models

# Create your models here.
class Employees(models.Model):
    name = models.CharField(max_length=25,null=False)
    prename = models.CharField(max_length=25,null=False)
    phone = models.IntegerField(default=0)
    salary = models.IntegerField(default=0)
    card = models.CharField(max_length=25)
    hour = models.IntegerField(default=0)
    hourjob = models.IntegerField(default=0)

    @property
    def salary_per_hour(self):
        if self.hourjob == 0:
            return 0
        return self.salary / self.hourjob

    def __str__(self):
        return f"{self.name} {self.prename} "
