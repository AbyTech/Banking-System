from django.urls import path, re_path
from bank.views import FrontendAppView  # Adjust the import to your view
from django.urls import path, include
from. import views

urlpatterns = [
    # ... all your other API URLs (DRF, admin, etc.) ...
    path('api/auth/', include('app.users.urls')),
    path('api/bank/', include('app.bank.urls')),
    
    # ... other API endpoints ...

]