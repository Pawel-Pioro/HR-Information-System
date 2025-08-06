from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken 
from rest_framework import status

from .serializers import UserLoginSerializer, UserRegisterSerializer


@api_view(['POST'])
@permission_classes([AllowAny])
def loginView(request):
    data = request.data
    serializer = UserLoginSerializer(data=data)
    if serializer.is_valid(raise_exception=True):
        user = serializer.validate(data)
        tokens = RefreshToken.for_user(user)
        if user:
            return Response({"tokens": {"refresh": str(tokens), "access": str(tokens.access_token)}}, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
@permission_classes([AllowAny])
def registerView(request):
    data = request.data
    serializer = UserRegisterSerializer(data=data)
    if serializer.is_valid(raise_exception=True):
        user = serializer.create(serializer.validated_data)
        tokens = RefreshToken.for_user(user)
        if user:
            return Response({"tokens": {"refresh": str(tokens), "access": str(tokens.access_token)}}, status=status.HTTP_201_CREATED)
        else:
            return Response({"error": "User Creation Failed"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    