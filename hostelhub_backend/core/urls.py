from django.urls import path, include
from dj_rest_auth.views import LoginView, LogoutView, UserDetailsView
from dj_rest_auth.jwt_auth import get_refresh_view
from .views import RegisterUserView

urlpatterns = [
    path('users/', RegisterUserView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='rest_login'),
    path('logout/', LogoutView.as_view(), name='rest_logout'),
    path('user/', UserDetailsView.as_view(), name='rest_user_details'),
    
    # ✅ Token Refresh (manually added)
    path('token/refresh/', get_refresh_view().as_view(), name='token_refresh'),
]
