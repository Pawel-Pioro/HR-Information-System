from rest_framework import serializers
from django.contrib.auth import get_user_model

UserModel = get_user_model()

from .models import Employee, Department, LeaveRequest

class LeaveRequestSerializer(serializers.ModelSerializer):
    leave_type_name = serializers.CharField(source='leave_type.name', read_only=True)
    duration = serializers.SerializerMethodField()

    class Meta:
        model = LeaveRequest
        fields = "__all__"

    def get_duration(self, obj):
        return obj.duration()

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ('id', 'name',)

class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('id', 'email', 'is_staff', 'first_name', 'last_name')  

class EmployeeDetailSerializer(serializers.ModelSerializer):
    department = serializers.SlugRelatedField(
        slug_field='name', 
        queryset=Department.objects.all()
    )
    manager = UserInfoSerializer()
    leave_requests = serializers.SerializerMethodField()

    class Meta:
        model = Employee
        fields = '__all__'

    def get_leave_requests(self, obj):
        pendingRequests = obj.leaveRequests.filter(is_pending=True)
        return LeaveRequestSerializer(pendingRequests, many=True).data

class EmployeeListSerializer(serializers.ModelSerializer):
    department = serializers.SlugRelatedField(slug_field='name', queryset=Department.objects.all())

    class Meta:
        model = Employee
        fields = ('jobTitle', 'department', 'employmentStatus')

class UserDetailSerializer(serializers.ModelSerializer):
    employee = EmployeeDetailSerializer()

    class Meta:
        model = UserModel
        fields = ('id', 'email', 'is_staff', 'first_name', 'last_name', 'employee')

    def update(self, instance, validated_data):
        employee_data = validated_data.pop('employee', {})
        
        # update user model
        instance = super().update(instance, validated_data)

        # update employee model
        if len(employee_data) > 0:
            for attr, value in employee_data.items():
                setattr(instance.employee, attr, value)
            instance.employee.save()
        
        return instance

class UserSerializer(serializers.ModelSerializer):
    employee = EmployeeListSerializer()

    class Meta:
        model = UserModel
        fields = ('id', 'email', 'is_staff', 'first_name', 'last_name', 'employee')    
        
    def update(self, instance, validated_data):
        employee_data = validated_data.pop('employee', {})
        
        # update user model
        instance = super().update(instance, validated_data)
        
        # update employee model
        if len(employee_data) > 0:
            for attr, value in employee_data.items():
                setattr(instance.employee, attr, value)
            instance.employee.save()
        
        return instance