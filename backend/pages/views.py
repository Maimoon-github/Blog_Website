from django.contrib.contenttypes.models import ContentType
from django.http import Http404
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import (
    HomePage,
    AboutPage,
    ServicesPage,
    ContactPage,
    PrivacyPolicyPage,
    TermsPage,
)
from .serializers import (
    HomePageSerializer,
    AboutPageSerializer,
    ServicesPageSerializer,
    ContactPageSerializer,
    PrivacyPolicyPageSerializer,
    TermsPageSerializer,
)

# Mapping of page model -> serializer
PAGE_SERIALIZER_MAP = {
    HomePage: HomePageSerializer,
    AboutPage: AboutPageSerializer,
    ServicesPage: ServicesPageSerializer,
    ContactPage: ContactPageSerializer,
    PrivacyPolicyPage: PrivacyPolicyPageSerializer,
    TermsPage: TermsPageSerializer,
}

# All static page types for slug resolution
STATIC_PAGE_TYPES = [AboutPage, ServicesPage, ContactPage, PrivacyPolicyPage, TermsPage]


class HomePageAPIView(APIView):
    def get(self, request, format=None):
        home_page = HomePage.objects.live().first()
        if not home_page:
            raise Http404("No live HomePage found.")
        serializer = HomePageSerializer(home_page, context={"request": request})
        return Response(serializer.data)


class StaticPageAPIView(APIView):
    def get(self, request, slug, format=None):
        # Filter by content types of allowed static pages
        content_types = ContentType.objects.get_for_models(*STATIC_PAGE_TYPES).values()
        page = (
            Page.objects.live()  # Page is imported below
            .filter(slug=slug, content_type__in=content_types)
            .specific()
            .first()
        )
        if not page:
            raise Http404("No live static page matches the given slug.")

        serializer_class = PAGE_SERIALIZER_MAP.get(type(page))
        if not serializer_class:
            raise Http404("No serializer for this page type.")

        serializer = serializer_class(page, context={"request": request})
        return Response(serializer.data)


# Avoid circular import: import Page after class definitions
from wagtail.models import Page  # noqa: E402