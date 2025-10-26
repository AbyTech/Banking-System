import uuid
from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import timedelta

User = get_user_model()

class Card(models.Model):
    CARD_TYPES = [
        ('virtual', 'Virtual Card'),
        ('physical', 'Physical Card'),
    ]
    
    STATUS_CHOICES = [
        ('pending_payment', 'Pending Payment'),
        ('paid', 'Paid'),
        ('issued', 'Issued'),
        ('active', 'Active'),
        ('expired', 'Expired'),
        ('cancelled', 'Cancelled'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cards')
    card_type = models.CharField(max_length=20, choices=CARD_TYPES)
    card_number = models.CharField(max_length=19)  # Masked: XXXX-XXXX-XXXX-1234
    expiry_date = models.DateField()
    cvv = models.CharField(max_length=3)  # Encrypted in real implementation
    purchase_amount = models.DecimalField(max_digits=10, decimal_places=2)
    purchase_status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending_payment')
    payment_deadline = models.DateTimeField()
    issued_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.card_type.title()} Card - {self.card_number}"
    
    def is_payment_overdue(self):
        return timezone.now() > self.payment_deadline and self.purchase_status == 'pending_payment'
    
    def time_until_deadline(self):
        if self.purchase_status != 'pending_payment':
            return None
        return self.payment_deadline - timezone.now()

class CardPurchase(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    card = models.ForeignKey(Card, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    merchant = models.CharField(max_length=255)
    location = models.CharField(max_length=255, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-timestamp']