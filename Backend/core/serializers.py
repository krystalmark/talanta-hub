from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile

class SignupSerializer(serializers.ModelSerializer):
    name = serializers.CharField()
    role = serializers.ChoiceField(choices=UserProfile.ROLE_CHOICES)
    opportunity = serializers.CharField(required=False, allow_blank=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'name', 'role', 'opportunity']

    def create(self, validated_data):
        name = validated_data.pop('name')
        role = validated_data.pop('role')
        opportunity = validated_data.pop('opportunity', '')

        user = User.objects.create_user(
            username=validated_data['username'],  # `username` is required by Django
            email=validated_data['email'],
            password=validated_data['password']
        )

        UserProfile.objects.create(
            user=user,
            name=name,
            role=role,
            opportunity=opportunity
        )
        return user
