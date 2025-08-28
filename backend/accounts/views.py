from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework import status, viewsets, mixins

from datetime import date
from django.utils import timezone

from .serializers import (
    DepartmentSerializer, 
    EmployeeDetailSerializer, 
    UserInfoSerializer, 
    UserSerializer, 
    UserDetailSerializer, 
    LeaveRequestSerializer,
    AttendanceSerializer
)
from .models import (
    Department,
    UserModel,
    LeaveRequest,
    Employee,
    Attendance
)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def userInfo(request):
    user = request.user
    userSerializer = UserInfoSerializer(user)

    return Response({"user": userSerializer.data}, status=status.HTTP_200_OK)

class UserViewset(
    viewsets.GenericViewSet,
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    mixins.UpdateModelMixin,
):
    def get_queryset(self):
        if self.request.user.is_staff:
            return UserModel.objects.all()
        else:
            return UserModel.objects.none()
        
    def get_serializer_class(self):
        if self.action == "list":
            return UserSerializer

        return UserDetailSerializer
    
class AttendanceViewset(
    viewsets.GenericViewSet,
):
    serializer_class = AttendanceSerializer
    permission_classes = [IsAuthenticated]

    def get_employee_from_user(self, user):
        if Employee.objects.filter(user=user).exists():
            return Employee.objects.get(user=user)
        else:
            return None
        
    def get_attendance_today(self, ):
        today = date.today()

        if not self.get_queryset().filter(date=today).exists():
            return None
        
        queryset = self.get_queryset().get(date=today)

        return queryset

    def get_queryset(self):
        user = self.request.user
        AttendanceObjects = Attendance.objects.all()

        if user.is_staff:
            userId = self.request.query_params.get('user', None)
            if userId:
                return AttendanceObjects.filter(user__id=userId)

        employee = self.get_employee_from_user(user)
        if employee:
            return AttendanceObjects.filter(user=employee)
        else:
            return AttendanceObjects.none()
    
    @action(detail=False, methods=['get'])
    def today(self, request):
        queryset = self.get_attendance_today()
        if not queryset:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(queryset)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['post'])
    def clock_in(self, request):
        user = request.user
        employee = self.get_employee_from_user(user)
        if not employee:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        attendanceToday = self.get_attendance_today()
        if not attendanceToday:
            newAttendance = Attendance.objects.create(user=employee)
            serializer = self.get_serializer(newAttendance)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            if attendanceToday.clockOut is not None:
                # employee already clocked out, clocking in again
                attendanceToday.clockOut = timezone.now()
                attendanceToday.save()
                serializer = self.get_serializer(attendanceToday)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                # employee clocked in, hasnt clocked out yet
                return Response(status=status.HTTP_400_BAD_REQUEST) 
            

    @action(detail=False, methods=['post'])
    def clock_out(self, request):
        user = request.user
        employee = self.get_employee_from_user(user)
        if not employee:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        attendanceToday = self.get_attendance_today()
        if not attendanceToday:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            attendanceToday.clockOut = timezone.now()
            attendanceToday.save()
            serializer = self.get_serializer(attendanceToday)
            return Response(serializer.data, status=status.HTTP_200_OK)





        


class EmployeeViewset(
    viewsets.GenericViewSet,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
):
    serializer_class = EmployeeDetailSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Employee.objects.all()
        else:
            return Employee.objects.none()
    
    

class DepartmentViewset(
    viewsets.GenericViewSet,
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
):
    serializer_class = DepartmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Department.objects.all()
        else:
            return Department.objects.none()

class LeaveRequestViewset(
    viewsets.GenericViewSet,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
):
    serializer_class = LeaveRequestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return LeaveRequest.objects.all()

        try:
            employee = Employee.objects.get(user=user)
        except Employee.DoesNotExist:
            return LeaveRequest.objects.none()
        
        return LeaveRequest.objects.filter(user=employee)
    
    @action(detail=True, methods=['patch'], permission_classes=[IsAuthenticated])
    def accept(self, request, pk):
        leave_request = self.get_object()
        if not request.user.is_staff:
            return Response({"error": "You are not authorized to perform this action."}, status=status.HTTP_403_FORBIDDEN)
        
        if leave_request.duration() > leave_request.user.leaveBalance:
            return Response({"error": "Not enough leave balance."}, status=status.HTTP_400_BAD_REQUEST)

        leave_request.is_pending = False
        leave_request.save()

        employee = leave_request.user
        
        if leave_request.leave_type.deducts_balance:
            employee.leaveBalance -= leave_request.duration()

        if leave_request.start_date == date.today():
            employee.employmentStatus = "On Leave"
        
        employee.save()

        serializer = self.get_serializer(leave_request)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['delete'], permission_classes=[IsAuthenticated])
    def reject(self, request, pk):
        leave_request = self.get_object()
        if not request.user.is_staff:
            return Response({"error": "You are not authorized to perform this action."}, status=status.HTTP_403_FORBIDDEN)

        leave_request.delete()

        return Response({"message": "Leave request deleted successfully"}, status=status.HTTP_200_OK)
