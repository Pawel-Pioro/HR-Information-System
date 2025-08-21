from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status, viewsets, mixins

from datetime import date

from .serializers import DepartmentSerializer, EmployeeDetailSerializer, UserInfoSerializer, UserSerializer, UserDetailSerializer, LeaveRequestSerializer
from .models import Department, UserModel, LeaveRequest, Employee


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
    
class EmployeeViewset(
    viewsets.GenericViewSet,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
):
    serializer_class = EmployeeDetailSerializer
    permission_classes = [IsAuthenticated]

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
