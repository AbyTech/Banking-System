from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Transaction, Account
from .serializers import TransactionSerializer, AccountSerializer
from django.db import transaction as db_transaction
from decimal import Decimal
from django.utils import timezone

@api_view(['GET'])
def get_transactions(request):
    transactions = Transaction.objects.filter(user=request.user)
    serializer = TransactionSerializer(transactions, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_transaction(request):
    serializer = TransactionSerializer(data=request.data)
    if serializer.is_valid():
        with db_transaction.atomic():
            transaction = serializer.save(user=request.user)
            account = Account.objects.get(user=request.user)
            
            if transaction.transaction_type in ['withdrawal', 'transfer', 'payment', 'card_purchase']:
                if account.current_balance >= transaction.amount:
                    account.current_balance -= transaction.amount
                    account.available_balance -= transaction.amount
                    transaction.status = 'completed'
                    transaction.completed_at = timezone.now()
                else:
                    transaction.status = 'failed'
            else:  # deposit
                account.current_balance += transaction.amount
                account.available_balance += transaction.amount
                transaction.status = 'completed'
                transaction.completed_at = timezone.now()
            
            account.save()
            transaction.save()
            
            from users.models import ActivityFeed
            ActivityFeed.objects.create(
                user=request.user,
                action_type='transaction',
                details={
                    'type': transaction.transaction_type,
                    'amount': str(transaction.amount),
                    'status': transaction.status
                }
            )
            
        return Response(TransactionSerializer(transaction).data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_account(request):
    account = Account.objects.get(user=request.user)
    serializer = AccountSerializer(account)
    return Response(serializer.data)