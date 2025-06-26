from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from .models import Hostel
from .serializers import HostelSerializer
from django.db.models import Q


class HostelListCreateView(generics.ListCreateAPIView):
    queryset = Hostel.objects.all()
    serializer_class = HostelSerializer
    filter_backends = [DjangoFilterBackend]  # allows ?location= queries
    filterset_fields = ['location']  # optional: allows /api/hostels/?location=Ngara

    def get_queryset(self):
        queryset = super().get_queryset()

        # Query params
        search = self.request.query_params.get("search", "").strip().lower()
        sort_by = self.request.query_params.get("sort", "newest")

        # 🔍 Apply search
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) | Q(description__icontains=search)
            )

        # ⬆️⬇️ Apply sorting
        if sort_by == "newest":
            queryset = queryset.order_by("-created_at")
        elif sort_by == "oldest":
            queryset = queryset.order_by("created_at")
        elif sort_by == "priceLow":
            queryset = queryset.order_by("price")
        elif sort_by == "priceHigh":
            queryset = queryset.order_by("-price")
        elif sort_by == "rating":
            queryset = queryset.order_by("-rating")

        return queryset
class HostelRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Hostel.objects.all()
    serializer_class = HostelSerializer

    def perform_update(self, serializer):
        # Increment views on update
        instance = serializer.save()
        instance.views += 1
        instance.save()
        return instance
    def perform_destroy(self, instance):
        # Custom logic before deletion if needed
        instance.delete()
        return instance
    