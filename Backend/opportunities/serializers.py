from rest_framework import serializers
from .models import Opportunity

class OpportunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Opportunity
        fields = '__all__'
        read_only_fields = ['posted_by', 'role', 'created_at']
