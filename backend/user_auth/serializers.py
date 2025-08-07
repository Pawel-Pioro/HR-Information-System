from rest_framework import serializers
from django.contrib.auth import authenticate, get_user_model

UserModel = get_user_model()

class UserLoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, validated_data):
        user = authenticate(email=validated_data['email'], password=validated_data['password'])

        if not user:
            raise serializers.ValidationError("Wrong email or password")
        else:
            return user

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('email', 'password', 'first_name', 'last_name')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = UserModel.objects.create_user(email=validated_data['email'], password=validated_data['password'], first_name=validated_data['first_name'], last_name=validated_data['last_name'])
        user.save()
        return user