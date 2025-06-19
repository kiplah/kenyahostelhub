from rest_framework import viewsets, permissions, serializers
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Hostel, Booking, Message, Favorite, Notification
from .serializers import HostelSerializer, BookingSerializer, MessageSerializer, FavoriteSerializer, NotificationSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

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
        hostel = serializer.validated_data['hostel']
        if hostel.available_rooms <= 0:
            raise serializers.ValidationError("No available rooms in this hostel.")
        serializer.save(user=self.request.user)

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        prev_status = instance.status  # Save current status before update
        response = super().partial_update(request, *args, **kwargs)
        instance.refresh_from_db()  # Get updated values
        new_status = instance.status
        hostel = instance.hostel

        # ✅ Case 1: Approving booking → reduce available_rooms
        if prev_status != 'approved' and new_status == 'approved':
            if hostel.available_rooms > 0:
                hostel.available_rooms -= 1
                hostel.save()
            else:
                return Response({'detail': 'No rooms available'}, status=400)

        # ✅ Case 2: Rejected or canceled after approval → increase available_rooms
        elif prev_status == 'approved' and new_status != 'approved':
            hostel.available_rooms += 1
            hostel.save()

        # ✅ Notification logic
        if prev_status != new_status:
            msg = f"Your booking for '{hostel.name}' has been {new_status}."
            Notification.objects.create(
                user=instance.user,
                message=msg
            )

        return response



class MessageViewSet(viewsets.ModelViewSet):
    serializer_class = MessageSerializer

    def get_queryset(self):
        user = self.request.user
        return Message.objects.filter(receiver=user).order_by('-timestamp')

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)

    def get_permissions(self):
        return [permissions.IsAuthenticated()]

class FavoriteViewSet(viewsets.ModelViewSet):
    serializer_class = FavoriteSerializer

    def get_queryset(self):
        return Favorite.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_permissions(self):
        return [permissions.IsAuthenticated()]

class NotificationViewSet(viewsets.ModelViewSet):
    serializer_class = NotificationSerializer

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user).order_by('-timestamp')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_permissions(self):
        return [permissions.IsAuthenticated()]

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_dashboard(request):
    user = request.user

    if user.role == 'owner':
        hostels = Hostel.objects.filter(owner=user)
        total_hostels = hostels.count()
        total_bookings = Booking.objects.filter(hostel__in=hostels).count()
        pending = Booking.objects.filter(hostel__in=hostels, status='pending').count()
        return Response({
            'role': 'owner',
            'total_hostels': total_hostels,
            'total_bookings': total_bookings,
            'pending_requests': pending
        })

    elif user.role == 'student':
        bookings = Booking.objects.filter(user=user)
        favorites = Favorite.objects.filter(user=user)
        return Response({
            'role': 'student',
            'bookings_made': bookings.count(),
            'favorites': favorites.count(),
            'approved_bookings': bookings.filter(status='approved').count()
        })

    return Response({'detail': 'Role not recognized'}, status=400)
