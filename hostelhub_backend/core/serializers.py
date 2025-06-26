from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    re_password = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = User
        fields = ('username', 'email', 'phone', 'password', 're_password', 'role', 'is_active')

    def validate(self, attrs):
        if attrs['password'] != attrs['re_password']:
            raise serializers.ValidationError({"re_password": "Passwords do not match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('re_password')  # remove before saving
        user = User.objects.create_user(**validated_data)
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']
        read_only_fields = ['id']

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.save()
        return instance
 
class CustomRegisterSerializer(RegisterSerializer):
    phone = serializers.CharField(required=False)
    role = serializers.ChoiceField(choices=[
        ('student', 'Student'),
        ('landlord', 'Landlord'),
        ('admin', 'Admin'),
    ])

    def get_cleaned_data(self):
        data = super().get_cleaned_data()
        data['phone'] = self.validated_data.get('phone', '')
        data['role'] = self.validated_data.get('role', 'student')
        return data
