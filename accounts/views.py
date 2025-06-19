from rest_framework import viewsets, permissions
from .models import User
from .serializers import CustomUserSerializer

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.IsAdminUser]
    lookup_field = 'username'
    