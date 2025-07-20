from rest_framework import serializers
from .models import Talent

class TalentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Talent
        fields = ['id', 'user', 'name', 'contact', 'photo', 'bio', 'url', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']
