from rest_framework import serializers
from django.contrib.auth import authenticate, get_user_model

UserModel = get_user_model()

class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, validated_data):
        user = authenticate(username=validated_data['username'], password=validated_data['password'])

        if not user:
            raise serializers.ValidationError("Wrong username or password")
        else:
            return user

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = UserModel.objects.create_user(username=validated_data['username'], email=validated_data['email'], password=validated_data['password'])
        user.save()
        return user