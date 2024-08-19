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
    salary_per_hour = serializers.SerializerMethodField()

    class Meta:
        model = Employees
        fields = ['id', 'name', 'prename', 'card', 'phone', 'salary', 'hour', 'hourjob', 'salary_per_hour', 'accompte', 'salarypay']

    def get_salary_per_hour(self, obj):
        return obj.salary_per_hour
    
class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ['id', 'title', 'column']

class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = ['id', 'date', 'employee', 'hours', 'notes']