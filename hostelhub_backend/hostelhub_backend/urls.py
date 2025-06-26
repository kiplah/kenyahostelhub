from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),

    # dj-rest-auth endpoints for login/logout/password
    path('api/auth/', include('dj_rest_auth.urls')),

    # dj-rest-auth registration
    path('api/auth/registration/', include('dj_rest_auth.registration.urls')),

    # Hostel-related endpoints
    path('api/', include('hostels.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
