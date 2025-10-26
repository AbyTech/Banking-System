from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_loans, name='get_loans'),
    path('create/', views.create_loan, name='create_loan'),
]