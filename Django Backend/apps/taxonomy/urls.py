# apps/taxonomy/urls.py
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import CategoryViewSet, TagViewSet

router = DefaultRouter(trailing_slash=False)
router.register(r"categories", CategoryViewSet, basename="category")
router.register(r"tags", TagViewSet, basename="tag")

app_name = "taxonomy"

urlpatterns = [
    path("", include(router.urls)),
]
