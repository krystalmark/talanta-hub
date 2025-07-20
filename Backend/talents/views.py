from rest_framework import viewsets, permissions
from .models import Talent
from .serializers import TalentSerializer

class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user

class TalentViewSet(viewsets.ModelViewSet):
    queryset = Talent.objects.all().order_by('-created_at')
    serializer_class = TalentSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated(), IsOwner()]
        return [permissions.AllowAny()]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
