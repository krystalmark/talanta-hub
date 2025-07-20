from django.db import models
from django.conf import settings

class Opportunity(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    contact = models.CharField(max_length=255)
    organization = models.CharField(max_length=255, blank=True, null=True)
    photo = models.ImageField(upload_to='opportunity_photos/', blank=True, null=True)
    posted_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    role = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
