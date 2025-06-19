from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import (
    HostelViewSet, BookingViewSet, MessageViewSet,
    FavoriteViewSet, NotificationViewSet, user_dashboard
)

router = DefaultRouter()
router.register(r'hostels', HostelViewSet, basename='hostels')
router.register(r'bookings', BookingViewSet, basename='bookings')
router.register(r'messages', MessageViewSet, basename='messages')
router.register(r'favorites', FavoriteViewSet, basename='favorites')
router.register(r'notifications', NotificationViewSet, basename='notifications')

urlpatterns = [
    path('dashboard/', user_dashboard),  # 👈 Custom user dashboard endpoint
]

urlpatterns += router.urls  # 👈 Add all the viewset routes
