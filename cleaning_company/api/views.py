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
            # ids = request.data.get('ids')
            ids = ['1','2','3','4']
            for ide in ids:
                # employee= Employees.objects.get(id=int(ide))
                # employee.hour += 1
                # employee.save()
                id = int(ide)+1
                print(id)