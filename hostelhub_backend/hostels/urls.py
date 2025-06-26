from django.urls import path
from .views import HostelListCreateView, HostelRetrieveUpdateDestroyView

urlpatterns = [
    path('hostels/', HostelListCreateView.as_view(), name='hostel-list-create'),
    path('hostels/<int:pk>/', HostelRetrieveUpdateDestroyView.as_view(), name='hostel-detail'),
]
