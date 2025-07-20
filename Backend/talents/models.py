from django.db import models
from django.conf import settings

class Talent(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    contact = models.CharField(max_length=255)
    photo = models.ImageField(upload_to='talent_photos/', blank=True, null=True)
    bio = models.TextField()
    url = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} — {self.user.username}"
