from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_cards, name='get_cards'),
    path('create/', views.create_card, name='create_card'),
    path('<uuid:card_id>/pay/', views.pay_card, name='pay_card'),
]