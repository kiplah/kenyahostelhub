from rest_framework.routers import DefaultRouter
from .views import HostelViewSet, BookingViewSet, MessageViewSet

router = DefaultRouter()
router.register(r'hostels', HostelViewSet, basename='hostels')
router.register(r'bookings', BookingViewSet, basename='bookings')
router.register(r'messages', MessageViewSet, basename='messages')

urlpatterns = router.urls
