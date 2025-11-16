from django.contrib import admin
from django.urls import path, include
from django.views.generic.base import RedirectView
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Primewave Bank API",
        default_version='v1',
        description="API for Primewave Bank",
    ),
    public=True,
)

urlpatterns = [
    path('', RedirectView.as_view(url='/api/docs/', permanent=False)),
    path('admin/', admin.site.urls),
    path('api/auth/', include('app.users.urls')),
    path('api/bank/', include('app.bank.urls')),
    path('api/cards/', include('app.cards.urls')),
    path('api/loans/', include('app.loans.urls')),
    path('api/docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]
