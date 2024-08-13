from django.db import models

# Create your models here.
class Employees(models.Model):
    name = models.CharField(max_length=25,null=False)
    prename = models.CharField(max_length=25,null=False)
    phone = models.IntegerField(default=0)
    salary = models.IntegerField(default=0)
    salarypay = models.IntegerField(default=0)
    card = models.CharField(max_length=25)
    hour = models.IntegerField(default=0)
    hourjob = models.IntegerField(default=0)
    salary_per_hour = models.IntegerField(default=0)

    def save(self, *args, **kwargs):
        if self.hour != 0:
            self.salary_per_hour = self.salary / self.hour
        else:
            self.salary_per_hour = 0
        super(Employees, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} {self.prename} "
