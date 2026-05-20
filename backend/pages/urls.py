from django.urls import path

from .views import HomePageAPIView, StaticPageAPIView

urlpatterns = [
    path("home/", HomePageAPIView.as_view(), name="api-pages-home"),
    path("<slug:slug>/", StaticPageAPIView.as_view(), name="api-pages-detail"),
]