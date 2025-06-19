from django.db import models
from accounts.models import User

class Hostel(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='hostels')
    name = models.CharField(max_length=100)
    description = models.TextField()
    location = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    is_verified = models.BooleanField(default=False)
    image = models.ImageField(upload_to='hostel_images/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.location}"
class Booking(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    hostel = models.ForeignKey(Hostel, on_delete=models.CASCADE, related_name='bookings')
    check_in = models.DateField()
    check_out = models.DateField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} → {self.hostel.name} ({self.status})"
class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages')
    content = models.TextField()
    hostel = models.ForeignKey(Hostel, on_delete=models.CASCADE, related_name='messages', null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.sender} → {self.receiver} @ {self.timestamp.strftime('%Y-%m-%d %H:%M')}"
