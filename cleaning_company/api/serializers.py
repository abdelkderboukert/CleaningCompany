from .models import *
from rest_framework import serializers
class EmployeeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Employees
        fields = ['id', 'name', 'prename', 'card', 'phone' , 'salary', 'hour']

    def create(self, validated_data):
        Employee = Employees.objects.create(
            name = validated_data['name'],
            prename = validated_data['prename'],
            card = validated_data['card'],
            phone = validated_data['phone'],
            salary = validated_data['salary'],
            hour = validated_data['hour'],
        )
        Employee.save()
        return Employee

class EmployeesListeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Employees
        fields = ['id', 'name', 'prename', 'card', 'phone' , 'salary', 'hour', 'hourjob']