from rest_framework import serializers
from .models import Hostel, Booking, Message

class HostelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hostel
        fields = '__all__'
        read_only_fields = ['owner', 'created_at', 'is_verified']
        extra_kwargs = {
            'price': {'min_value': 0},
            'image': {'required': False}
        }
class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'
        read_only_fields = ['user', 'status', 'created_at']     

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'
        read_only_fields = ['sender', 'timestamp', 'is_read']  