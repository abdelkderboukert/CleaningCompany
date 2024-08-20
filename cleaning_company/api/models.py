from django.db import models

# Create your models here.
class Employees(models.Model):
    name = models.CharField(max_length=25,null=False)
    prename = models.CharField(max_length=25,null=False)
    phone = models.IntegerField(default=0)
    salary = models.IntegerField(default=0)
    salarypay = models.IntegerField(default=0)
    card = models.CharField(max_length=25, unique=True)
    hour = models.IntegerField(default=0)
    hourjob = models.IntegerField(default=0)
    accompte = models.IntegerField(default=0)
    salary_per_hour = models.IntegerField(default=0)

    def save(self, *args, **kwargs):
        if self.hour != 0:
            self.salary_per_hour = self.salary / self.hour
        else:
            self.salary_per_hour = 0
        super(Employees, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} {self.prename} "
    
class Todo(models.Model):
    title = models.TextField()
    column = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.title}/{self.column} "


class Attendance(models.Model):
    employee = models.ForeignKey(Employees, on_delete=models.CASCADE)
    notes = models.TextField()
    hours = models.CharField(max_length=2)
    date = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.employee.name} {self.employee.prename} - {self.date}/{self.hours}/{self.notes} "
    

class Tarif(models.Model):
    item = models.CharField(max_length=25,null=False)
    monto = models.IntegerField(default=0)
    date = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.item}:{self.monto}DA - {self.date} "