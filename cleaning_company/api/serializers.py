from .models import *
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

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
        fields = ['id', 'name', 'prename', 'card', 'phone' , 'salary', 'hour']