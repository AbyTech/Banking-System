from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Card, CardPurchase
from .serializers import CardSerializer, CardPurchaseSerializer
from django.utils import timezone
from datetime import timedelta
import random

@api_view(['GET'])
def get_cards(request):
    cards = Card.objects.filter(user=request.user)
    serializer = CardSerializer(cards, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_card(request):
    card_type = request.data.get('card_type', 'virtual')
    card_number = f"4111{random.randint(1000, 9999)}{random.randint(1000, 9999)}{random.randint(1000, 9999)}"
    expiry_date = timezone.now().date() + timedelta(days=365*3)  # 3 years
    
    card = Card.objects.create(
        user=request.user,
        card_type=card_type,
        card_number=card_number,
        expiry_date=expiry_date,
        cvv=f"{random.randint(100, 999)}",
        purchase_amount=0.00 if card_type == 'virtual' else 50.00,
        purchase_status='paid' if card_type == 'virtual' else 'pending_payment',
        payment_deadline=timezone.now() + timedelta(days=7)
    )
    
    return Response(CardSerializer(card).data, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def pay_card(request, card_id):
    try:
        card = Card.objects.get(id=card_id, user=request.user)
        if card.purchase_status == 'pending_payment':
            card.purchase_status = 'paid'
            card.save()
            return Response({'message': 'Card payment successful'})
        return Response({'error': 'Card already paid'}, status=status.HTTP_400_BAD_REQUEST)
    except Card.DoesNotExist:
        return Response({'error': 'Card not found'}, status=status.HTTP_404_NOT_FOUND)