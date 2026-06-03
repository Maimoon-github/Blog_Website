# apps/seo/urls.py
from django.urls import path
from .views import GlobalConfigAPIView

app_name = "seo"

urlpatterns = [
    path("global-config/", GlobalConfigAPIView.as_view(), name="global_config"),
]