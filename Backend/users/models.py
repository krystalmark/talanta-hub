from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    ROLE_CHOICES = [
        ('Youth', 'Youth'),
        ('Mentor', 'Mentor'),
        ('Sponsor', 'Sponsor'),
        ('Organization', 'Organization'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    opportunity = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.name} ({self.role})"