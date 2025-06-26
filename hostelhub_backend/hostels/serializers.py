from rest_framework import serializers
from .models import Hostel

class HostelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hostel
        fields = '__all__'
        read_only_fields = ['created_at', 'views', 'rating']
        extra_kwargs = {
            'image': {'required': False},
            'owner_name': {'required': False},
            'contact_phone': {'required': False},
            'contact_email': {'required': False},
            'website': {'required': False},
            'amenities': {'required': False},
            'town': {'required': False},
            'university_nearby': {'required': False},
            'distance_to_campus': {'required': False},
        }
