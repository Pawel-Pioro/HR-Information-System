from rest_framework import serializers
from django.contrib.auth import get_user_model

UserModel = get_user_model()


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('username', 'email', 'is_staff')       