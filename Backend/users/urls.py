from django.urls import path
from .views import get_all_users, clear_opportunity

urlpatterns = [
    path('users/', get_all_users),
    path('users/<int:user_id>/remove-opportunity/', clear_opportunity),
]