import pytz
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.utils import timezone

UserModel = get_user_model()

from .models import Employee, Department, LeaveRequest, Attendance, LeaveType

class LeaveTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeaveType
        fields = ('id', 'name', 'deducts_balance')

class LeaveRequestSerializer(serializers.ModelSerializer):
    leave_type_name = serializers.CharField(source='leave_type.name', read_only=True)
    duration = serializers.SerializerMethodField()

    class Meta:
        model = LeaveRequest
        fields = "__all__"
        read_only_fields = ('user',)

    def get_duration(self, obj):
        return obj.duration()
    
    def validate(self, data):
        start_date = data.get('start_date')
        end_date = data.get('end_date')
        today = timezone.localdate()  

        # Check start date is in the future
        if start_date and start_date < today:
            raise serializers.ValidationError({
                'start_date': 'Start date must be in the future.'
            })

        # Check end date is after start date
        if start_date and end_date and end_date < start_date:
            raise serializers.ValidationError({
                'end_date': 'End date cannot be before start date.'
            })

        return data
    
class AttendanceSerializer(serializers.ModelSerializer):
    clockIn = serializers.DateTimeField( read_only=True)
    clockOut = serializers.DateTimeField( allow_null=True, required=False)

    class Meta:
        model = Attendance
        fields = '__all__'

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ('id', 'name',)

class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('id', 'email', 'is_staff', 'first_name', 'last_name', 'employee')  

class EmployeeDetailSerializer(serializers.ModelSerializer):
    dateOfBirth = serializers.DateField(format="%Y-%m-%d")
    department = serializers.SlugRelatedField(
        slug_field='name', 
        allow_null=True,
        queryset=Department.objects.all(),
        required=False
    )
    manager = serializers.SlugRelatedField(
        slug_field='email',
        allow_null=True,
        queryset=UserModel.objects.all(),
        write_only=True,
        required=False
    )

    manager_detail = UserInfoSerializer(source='manager', read_only=True)

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