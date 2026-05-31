"""
Wagtail API v2 endpoint for AuthorPage.
"""
from wagtail.api.v2.views import PagesAPIViewSet


class AuthorPageAPIViewSet(PagesAPIViewSet):
    """Registered on the Wagtail API v2 router as 'authors'."""

    model_admin = None

    def get_queryset(self):
        from .models import AuthorPage
        return AuthorPage.objects.live().public().order_by("title")
