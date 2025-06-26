from django.contrib import admin
from .models import Hostel

@admin.register(Hostel)
class HostelAdmin(admin.ModelAdmin):
    list_display = ("name", "location", "price", "is_premium", "available", "created_at")
    search_fields = ("name", "location", "university_nearby")
    list_filter = ("is_premium", "available", "gender_restriction")
