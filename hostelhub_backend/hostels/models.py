from django.db import models

class Hostel(models.Model):
    # Required fields
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to="hostels/images/")
    description = models.TextField()

    # Optional contact details
    owner_name = models.CharField(max_length=100, blank=True, null=True)
    contact_phone = models.CharField(max_length=20, blank=True, null=True)
    contact_email = models.EmailField(blank=True, null=True)
    website = models.URLField(blank=True, null=True)

    # Availability and status
    is_premium = models.BooleanField(default=False)
    available = models.BooleanField(default=True)

    # Property details
    rooms_available = models.IntegerField(default=0)
    gender_restriction = models.CharField(
        max_length=50,
        choices=[
            ("unisex", "Unisex"),
            ("male_only", "Male Only"),
            ("female_only", "Female Only"),
        ],
        default="unisex",
    )

    # Core amenities as booleans
    has_security = models.BooleanField(default=False)
    has_water = models.BooleanField(default=False)
    has_power = models.BooleanField(default=False)
    has_wifi = models.BooleanField(default=False)
    has_parking = models.BooleanField(default=False)

    # Optional extra info
    amenities = models.TextField(blank=True, null=True)  # custom notes

    # Location specifics
    town = models.CharField(max_length=100, blank=True, null=True)
    university_nearby = models.CharField(max_length=255, blank=True, null=True)
    distance_to_campus = models.CharField(max_length=100, blank=True, null=True)

    # Metadata
    rating = models.FloatField(default=0.0, blank=True, null=True)
    views = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
