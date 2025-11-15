from rest_framework import serializers
from .models import Card, CardPurchase

class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = '__all__'

class CardPurchaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = CardPurchase
        fields = '__all__'