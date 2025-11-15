from rest_framework import serializers
from .models import Transaction, Account

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ('id', 'transaction_type', 'amount', 'currency_code', 'description', 'metadata', 'timestamp', 'status')

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('account_number', 'routing_number', 'current_balance', 'available_balance')