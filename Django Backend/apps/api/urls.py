"""
URL routing for the custom DRF API.
All routes mount under /api/v1/ (set in config/urls.py).
"""
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .feed import FeedView
from .revalidate import RevalidateView
from .views import (
    AuthorsViewSet,
    BlogViewSet,
    CategoriesViewSet,
    ContactInfoView,
    NavigationView,
    PagesViewSet,
    SiteSettingsView,
    TagsViewSet,
)

app_name = "v1"

router = DefaultRouter(trailing_slash=True)
router.register(r"blog", BlogViewSet, basename="blog")
router.register(r"authors", AuthorsViewSet, basename="authors")
router.register(r"categories", CategoriesViewSet, basename="categories")
router.register(r"tags", TagsViewSet, basename="tags")
router.register(r"pages", PagesViewSet, basename="pages")

urlpatterns = [
    # ViewSet routes
    path("", include(router.urls)),

    # Singleton endpoints
    path("settings/", SiteSettingsView.as_view(), name="settings"),
    path("navigation/", NavigationView.as_view(), name="navigation"),
    path("contact-info/", ContactInfoView.as_view(), name="contact-info"),

    # Feed
    path("feed/", FeedView.as_view(), name="feed"),

    # Revalidation webhook
    path("revalidate/", RevalidateView.as_view(), name="revalidate"),
]
