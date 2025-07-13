from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import UserProfile
from .serializers import UserProfileSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_users(request):
    profiles = UserProfile.objects.select_related('user').all()
    serialized = UserProfileSerializer(profiles, many=True)
    return Response(serialized.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def clear_opportunity(request, user_id):
    try:
        profile = UserProfile.objects.get(user__id=user_id)
        if profile.user != request.user:
            return Response({'error': 'Unauthorized'}, status=403)
        profile.opportunity = ''
        profile.save()
        return Response({'success': True})
    except UserProfile.DoesNotExist:
        return Response({'error': 'User not found'}, status=404)

