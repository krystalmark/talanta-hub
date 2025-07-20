from rest_framework import viewsets, permissions
from .models import Opportunity
from .serializers import OpportunitySerializer

class CanPost(permissions.BasePermission):
    def has_permission(self, request, view):
        if view.action == 'create':
            return request.user and request.user.is_authenticated and request.user.role in ['mentor', 'sponsor', 'organization']
        return True

    def has_object_permission(self, request, view, obj):
        return obj.posted_by == request.user

class OpportunityViewSet(viewsets.ModelViewSet):
    queryset = Opportunity.objects.order_by('-created_at')
    serializer_class = OpportunitySerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated(), CanPost()]
        return [permissions.AllowAny()]

    def perform_create(self, serializer):
        serializer.save(
            posted_by=self.request.user,
            role=self.request.user.role,
            organization=getattr(self.request.user, 'opportunity_info', '') or ''
        )
