from django.urls import path
from .views import TagListAPIView

urlpatterns = [
    path("", TagListAPIView.as_view(), name="api-tags-list"),
]
