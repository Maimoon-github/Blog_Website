# apps/blog/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import BlogPageAPIViewSet

router = DefaultRouter()
router.register(r"posts", BlogPageAPIViewSet, basename="blog-posts")

urlpatterns = [
    path("", include(router.urls)),
]