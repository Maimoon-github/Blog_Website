"""
Wagtail API v2 endpoint for all Page types.
"""
from wagtail.api.v2.views import PagesAPIViewSet as BaseViewSet


class PagesAPIViewSet(BaseViewSet):
    """Registered on the Wagtail API v2 router as 'pages'."""

    def get_queryset(self):
        return super().get_queryset().live().public()
