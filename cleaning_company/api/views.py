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
import os
from django.http import HttpResponse
from openpyxl import Workbook
from openpyxl.utils.cell import get_column_letter
from openpyxl.styles import Font, PatternFill, Alignment 
import openpyxl
from datetime import datetime
from .models import Employees  # Import your Employees model

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

def export_to_excel_view(request):
    # Get the current date and time
    now = datetime.now()
    print("is ok")
    # Create a new Excel workbook
    wb = Workbook()

    # Get the active worksheet
    ws = wb.active

    # Set the header row
    ws.merge_cells('A1:G1')
    cell = ws['A1']
    cell.value = 'tablo'
    cell.alignment = openpyxl.styles.Alignment(horizontal='center', vertical='center')
    cell.font = Font(bold=True, color='FFFFFF', size=16)  # White bold text
    cell.fill = PatternFill(start_color='0000FF', fill_type='solid')  # Blue fill
    ws['A2'] = 'Employee ID'
    ws['B2'] = 'Name'
    ws['C2'] = 'Prename'
    ws['D2'] = 'Salary'
    ws['E2'] = 'Hour'
    ws['F2'] = 'Hour Job'
    ws['G2'] = 'Salary to pay'

    # Get the data from the database
    employees = Employees.objects.all()

    # Initialize total salary to pay
    total_salary_to_pay = 0

    # Iterate over the data and write it to the worksheet
    for i, employee in enumerate(employees, start=2):
        ws[f'A{i+1}'] = employee.id
        ws[f'B{i+1}'] = employee.name
        ws[f'C{i+1}'] = employee.prename
        ws[f'D{i+1}'] = employee.salary
        ws[f'E{i+1}'] = employee.hour
        ws[f'F{i+1}'] = employee.hourjob
        ws[f'G{i+1}'] = employee.salarypay
        total_salary_to_pay += employee.salarypay

    total_row = len(employees) + 3    
    # Set the width of columns B to F to 90px
    for col in range(1, 8):  # Columns A to G
        column_letter = get_column_letter(col)
        ws.column_dimensions[column_letter].width = 20
        cell = ws.cell(row=total_row, column=col)
        cell.font = Font(bold=True, color='FFFFFF', size=16)  # White bold text
        cell.fill = PatternFill(start_color='0000FF', fill_type='solid')  # Blue fill
    
    for i in range(1, ws.max_row + 1):
        ws.row_dimensions[i].height = 20

    # Add a row for the total salary to pay
    
    ws[f'A{total_row}'] = 'Total'
    ws.merge_cells(f'B{total_row}:G{total_row}')
    ws[f'B{total_row}'] = total_salary_to_pay

    # Create a file response
    response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response['Content-Disposition'] = f'attachment; filename="employees_{now.strftime("%Y-%m")}.xlsx"'

    # Save the workbook to the response
    wb.save(response)

    # Return the response
    return response