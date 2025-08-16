from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status, viewsets, mixins

from .serializers import UserInfoSerializer, UserSerializer, UserDetailSerializer, LeaveRequestSerializer
from .models import UserModel, LeaveRequest, Employee


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def userInfo(request):
    user = request.user
    userSerializer = UserInfoSerializer(user)

    return Response({"user": userSerializer.data}, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def manageEmployees(request):
    if request.method == 'GET':
        if request.user.is_staff:
            users = UserModel.objects.all()
            serializer = UserSerializer(users, many=True)

            return Response({"employees": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "You are not authorized to perform this action."}, status=status.HTTP_403_FORBIDDEN)
    else:
        return Response({"error": "Invalid request method."}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def manageOneEmployee(request, id):
    if request.method == 'GET':
        if request.user.is_staff:
            if UserModel.objects.filter(id=id).exists():
                user = UserModel.objects.get(id=id)
                userSerializer = UserDetailSerializer(user)

                return Response({"employee": userSerializer.data}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"error": "You are not authorized to perform this action."}, status=status.HTTP_403_FORBIDDEN)
    else:
        return Response({"error": "Invalid request method."}, status=status.HTTP_400_BAD_REQUEST)
# @api_view(['PATCH'])
# @permission_classes([IsAuthenticated])
# def oneLeaveRequest(request, id):
#     if request.method == "PATCH":
#         if request.user.is_staff:
#             if LeaveRequest.objects.filter(id=id).exists():
#                 leaveRequest = LeaveRequest.objects.get(id=id)
#                 serializer = LeaveRequestSerializer(leaveRequest, data=request.data, partial=True)
#                 if serializer.is_valid():
#                     serializer.save()
#                     return Response(serializer.data, status=status.HTTP_200_OK)
#                 else:
#                     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#             else:
#                 return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
#         else:
#             return Response({"error": "You are not authorized to perform this action."}, status=status.HTTP_403_FORBIDDEN)
#     else:
#         return Response({"error": "Invalid request method."}, status=status.HTTP_400_BAD_REQUEST)

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
    def reject(self, request, pk):
        leave_request = self.get_object()
        if not request.user.is_staff:
            return Response({"error": "You are not authorized to perform this action."}, status=status.HTTP_403_FORBIDDEN)

        leave_request.is_pending = False
        leave_request.save()

        serializer = self.get_serializer(leave_request)
        return Response(serializer.data, status=status.HTTP_200_OK)
