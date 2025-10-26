from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register_user, name='register'),
    path('login/', views.login_user, name='login'),
    path('verify-2fa/', views.verify_2fa, name='verify_2fa'),
    path('profile/', views.get_profile, name='profile'),
    path('countries/', views.get_countries, name='countries'),
    path('activity-feed/', views.get_activity_feed, name='activity_feed'),
]

