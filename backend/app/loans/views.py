from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Loan
from .serializers import LoanSerializer
from decimal import Decimal

@api_view(['GET'])
def get_loans(request):
    loans = Loan.objects.filter(user=request.user)
    serializer = LoanSerializer(loans, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_loan(request):
    amount = Decimal(request.data.get('amount', 0))
    duration = int(request.data.get('duration', 12))
    
    # Simple loan calculation
    interest_rate = Decimal('0.05')  # 5% interest
    monthly_interest = amount * interest_rate / Decimal('12')
    total_repayment = amount + (monthly_interest * duration)
    monthly_payment = total_repayment / duration
    
    loan = Loan.objects.create(
        user=request.user,
        amount=amount,
        currency_code=request.user.currency_code,
        duration_months=duration,
        interest_rate=interest_rate * 100,  # Convert to percentage
        monthly_payment=monthly_payment,
        total_repayment=total_repayment,
        status='pending'
    )
    
    return Response(LoanSerializer(loan).data, status=status.HTTP_201_CREATED)