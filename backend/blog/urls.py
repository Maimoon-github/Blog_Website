from django.urls import path

from .views import BlogPostListAPIView, BlogPostDetailAPIView, BlogStaticParamsAPIView

urlpatterns = [
    path("", BlogPostListAPIView.as_view(), name="api-blog-list"),
    path("params/", BlogStaticParamsAPIView.as_view(), name="api-blog-params"),
    path("<slug:slug>/", BlogPostDetailAPIView.as_view(), name="api-blog-detail"),
]