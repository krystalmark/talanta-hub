from django.contrib import admin
from .models import Opportunity

@admin.register(Opportunity)
class OpportunityAdmin(admin.ModelAdmin):
    list_display = ['title', 'organization', 'role', 'posted_by', 'created_at']
    search_fields = ('title', 'description', 'organization', 'posted_by__username')
    list_filter = ('role', 'organization', 'created_at')
