from rest_framework import viewsets, permissions
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Hostel, Booking, Message
from .serializers import HostelSerializer, BookingSerializer, MessageSerializer

class HostelViewSet(viewsets.ModelViewSet):
    queryset = Hostel.objects.all()
    serializer_class = HostelSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['location', 'is_verified']
    search_fields = ['name', 'location']

    def get_queryset(self):
        if self.request.user.is_staff:
            return Hostel.objects.all()
        return Hostel.objects.filter(is_verified=True)



    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy']:
            return [permissions.IsAdminUser()]
        if self.action == 'create':
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]


    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy']:
            return [permissions.IsAdminUser()]
        if self.action in ['create']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Booking.objects.all()
        return Booking.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class MessageViewSet(viewsets.ModelViewSet):
    serializer_class = MessageSerializer

    def get_queryset(self):
        user = self.request.user
        return Message.objects.filter(receiver=user).order_by('-timestamp')

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)

    def get_permissions(self):
        return [permissions.IsAuthenticated()]
