from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status

from .serializers import UserInfoSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def userInfo(request):
    user = request.user
    userSerializer = UserInfoSerializer(user)

    return Response({"user": userSerializer.data}, status=status.HTTP_200_OK)