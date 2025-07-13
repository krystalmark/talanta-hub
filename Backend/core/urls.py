from django.urls import path
from .views import signup_view, login_view

urlpatterns = [
    path('signup/', signup_view),
    path('login/', login_view),
     path('upload-talent/', upload_talent),
]
