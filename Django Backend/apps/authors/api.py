# apps/authors/api.py
from wagtail.api.v2.views import PagesAPIViewSet

class AuthorPageAPIViewSet(PagesAPIViewSet):
    model_admin = None

    def get_queryset(self):
        from .models import AuthorPage
        return AuthorPage.objects.live().public().order_by("title")