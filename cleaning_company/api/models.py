from django.db import models

# Create your models here.
class Employees(models.Model):
    name = models.CharField(max_length=25,null=False)
    prename = models.CharField(max_length=25,null=False)
    phone = models.IntegerField(default=0)
    salary = models.IntegerField(default=0)
    card = models.CharField(max_length=25)
    hour = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.Employees.name} {self.Empoyees.prename} "
