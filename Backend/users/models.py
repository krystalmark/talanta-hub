from django.contrib.auth.models import AbstractUser
from django.db import models

class UserProfile(AbstractUser):
    ROLE_CHOICES = [
        ('youth', 'Youth'),
        ('mentor', 'Mentor'),
        ('sponsor', 'Sponsor'),
        ('organization', 'Organization'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    opportunity_info = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.username
