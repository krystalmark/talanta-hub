from rest_framework.routers import DefaultRouter
from .views import TalentViewSet

router = DefaultRouter()
router.register(r'', TalentViewSet, basename='talent')

urlpatterns = router.urls
