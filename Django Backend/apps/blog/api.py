# apps/blog/api.py
"""
Wagtail API v2 endpoint for BlogPage.
"""
from wagtail.api.v2.views import PagesAPIViewSet


class BlogPageAPIViewSet(PagesAPIViewSet):
    """Registered on the Wagtail API v2 router as 'blog'."""

    def get_queryset(self):
        from .models import BlogPage
        return (
            BlogPage.objects.live()
            .public()
            .select_related("author", "cover_image", "featured_image")
            .prefetch_related("categories", "tags")
            .order_by("-published_date")
        )