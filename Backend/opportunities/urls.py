from rest_framework.routers import DefaultRouter
from .views import OpportunityViewSet

router = DefaultRouter()
router.register('', OpportunityViewSet)
urlpatterns = router.urls
