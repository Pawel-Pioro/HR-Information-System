from rest_framework import serializers
from django.contrib.auth import get_user_model

UserModel = get_user_model()

from .models import Employee, Department

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ('id', 'name',)

class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('id', 'email', 'is_staff', 'first_name', 'last_name')  

class EmployeeDetailSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer()
    manager = UserInfoSerializer()

    class Meta:
        model = Employee
        fields = '__all__'

class EmployeeListSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer()

    class Meta:
        model = Employee
        fields = ('jobTitle', 'department', 'employmentStatus')

class UserDetailSerializer(serializers.ModelSerializer):
    employee = EmployeeDetailSerializer()

    class Meta:
        model = UserModel
        fields = ('id', 'email', 'is_staff', 'first_name', 'last_name', 'employee')

class UserSerializer(serializers.ModelSerializer):
    employee = EmployeeListSerializer()

    class Meta:
        model = UserModel
        fields = ('id', 'email', 'is_staff', 'first_name', 'last_name', 'employee')     