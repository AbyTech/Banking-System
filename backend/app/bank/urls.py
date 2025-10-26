from django.urls import path
from . import views

urlpatterns = [
    path('transactions/', views.get_transactions, name='transactions'),
    path('transactions/create/', views.create_transaction, name='create_transaction'),
    path('account/', views.get_account, name='account'),
]