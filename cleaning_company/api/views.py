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

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/',
        '/api/userList/',
        '/api/camanies/',
        '/api/clients/',
        '/api/buyings/',
        '/api/balites/',
        '/api/dattes/',
        '/api/vers/',
    ]
    return Response(routes)

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

class HourJobView(APIView):
    def post(self, request):
        data = request.data.get('data', [])  # retrieve data from request body
        # data = [
        #     {'id': '1', 'hour': 2},
        #     {'id': '2', 'hour': 3},
        #     {'id': '3', 'hour': 1},
        #     {'id': '4', 'hour': 4}
        # ]  # hardcoded data for testing purposes

        # Validate the incoming data
        if not isinstance(data, list) or not all(isinstance(item, dict) for item in data):
            return Response({'error': 'Invalid data format'}, status=status.HTTP_400_BAD_REQUEST)

        # Update the hour for each employee
        for item in data:
            try:
                employee = Employees.objects.get(id=int(item['id']))
                employee.hour = employee.hour + int(item['hour'])
                employee.save()
            except Employees.DoesNotExist:
                return Response({'error': f"Employee with id {item['id']} does not exist"}, status=status.HTTP_404_NOT_FOUND)

        return Response(status=status.HTTP_202_ACCEPTED)
    
    def get(self, request):
        query = request.GET.get('q')
        if query:
            employee = Employees.objects.filter(name__icontains=query)
            for e in employee:
                h = e.salary_per_hour * e.hour
                e.hourjob = h
                e.save()
            serializer = EmployeeSerializer(employee, many=True)
        else:
            employee = Employees.objects.all()
            for e in employee:
                h = e.salary_per_hour * e.hour
                e.hourjob = h
                e.save()
        serializer = EmployeesListeSerializer(employee, many=True)
        return Response(serializer.data)
        
        