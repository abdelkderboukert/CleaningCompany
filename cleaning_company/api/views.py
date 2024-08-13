from django.shortcuts import render
from django.http import JsonResponse
from .serializers import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.request import Request
from django.db.models import F
from datetime import date

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/hourjob/',
        '/api/Employee/',
    ]
    return Response(routes)

class CreateEmployeeView(APIView):
    def post(self, request):
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class EmployeeView(APIView):
    def get(self, request):
        query = request.GET.get('q')
        if query:
            Employee = Employees.objects.filter(name__icontains=query)
        else:
            Employee = Employees.objects.all()
        serializer = EmployeesListeSerializer(Employee, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = EmployeeSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class DeleteEmployeeView(APIView):
    def delete(self, request, pk):
        try:
            Employees.objects.get(id=pk).delete()
        except Employees.DoesNotExist:
            pass
        Response(status=status.HTTP_201_CREATED)

from django.db.models import F

class HourJobView(APIView):
    def post(self, request):
        data = request.data
        # .get('data', [])
        # Validate the incoming data
        if not isinstance(data, list) or not all(isinstance(item, dict) for item in data):
            return Response({'error': 'Invalid data format'}, status=status.HTTP_400_BAD_REQUEST)

        errors = []
        for item in data:
            if 'id' not in item or 'hour' not in item:
                errors.append({'error': 'Missing required keys', 'data': item})
                continue

            try:
                employee = Employees.objects.get(id=int(item['id']))
                employee.hourjob = F('hourjob') + int(item['hour'])
                employee.save()
            except Employees.DoesNotExist:
                errors.append({'error': f"Employee with id {item['id']} does not exist", 'data': item})

        if errors:
            return Response({'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_202_ACCEPTED)

    def get(self, request):
        query = request.GET.get('q')
        if query:
            employees = Employees.objects.filter(name__icontains=query)
        else:
            employees = Employees.objects.all()

        # Update hourjob attribute in a single query
        employees.update(salarypay=F('salary_per_hour') * F('hourjob'))

        serializer = EmployeesListeSerializer(employees, many=True)
        return Response(serializer.data)
        
import os
from django.http import HttpResponse
from openpyxl import Workbook
from datetime import datetime
from .models import Employees  # Import your Employees model

def export_to_excel_view(request):
    # Get the current date and time
    now = datetime.now()
    print("is ok")
    # Create a new Excel workbook
    wb = Workbook()

    # Get the active worksheet
    ws = wb.active

    # Set the header row
    ws['A1'] = 'Employee ID'
    ws['B1'] = 'Name'
    ws['C1'] = 'Salary'
    ws['D1'] = 'Hour'
    ws['E1'] = 'Hour Job'

    # Get the data from the database
    employees = Employees.objects.all()

    # Iterate over the data and write it to the worksheet
    for i, employee in enumerate(employees, start=2):
        ws[f'A{i}'] = employee.id
        ws[f'B{i}'] = employee.name
        ws[f'C{i}'] = employee.salary
        ws[f'D{i}'] = employee.hour
        ws[f'E{i}'] = employee.hourjob

    # Create a file response
    response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response['Content-Disposition'] = f'attachment; filename="employees_{now.strftime("%Y-%m")}.xlsx"'

    # Save the workbook to the response
    wb.save(response)

    # Return the response
    return response      