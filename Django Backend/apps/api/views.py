# apps/api/views.py
"""
All custom DRF API views.

Endpoints:
  GET  /api/v1/pages/                 → site pages listing
  GET  /api/v1/pages/<slug>/          → single page by slug
  GET  /api/v1/blog/                  → blog posts listing (paginated, filterable)
  GET  /api/v1/blog/<slug>/           → single blog post
  GET  /api/v1/blog/featured/         → featured posts
  GET  /api/v1/blog/slugs/            → all slugs (for generateStaticParams)
  GET  /api/v1/authors/               → authors listing
  GET  /api/v1/authors/<slug>/        → single author
  GET  /api/v1/authors/slugs/         → all author slugs
  GET  /api/v1/categories/            → categories listing
  GET  /api/v1/categories/<slug>/     → single category with posts
  GET  /api/v1/tags/                  → tags listing
  GET  /api/v1/tags/<slug>/           → single tag with posts
  GET  /api/v1/settings/              → site settings (name, logo, analytics)
  GET  /api/v1/navigation/            → header/footer menus + social links
  GET  /api/v1/feed/                  → RSS / JSON Feed (see feed.py)
  POST /api/v1/revalidate/            → ISR revalidation webhook
"""
import logging

from django.core.cache import cache
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ReadOnlyModelViewSet, ViewSet

from apps.authors.models import AuthorIndexPage, AuthorPage
from apps.authors.serializers import AuthorMinimalSerializer, AuthorSerializer
from apps.blog.models import BlogIndexPage, BlogPage
from apps.blog.serializers import BlogPostDetailSerializer, BlogPostMinimalSerializer
from apps.pages.models import (
    AboutPage,
    ContactPage,
    HomePage,
    PrivacyPolicyPage,
    ServicesPage,
    TermsPage,
)
from apps.pages.serializers import (
    AboutPageSerializer,
    ContactPageSerializer,
    HomePageSerializer,
    PrivacyPolicyPageSerializer,
    ServicesPageSerializer,
    TermsPageSerializer,
)
from apps.taxonomy.models import Category, Tag
from apps.taxonomy.serializers import CategorySerializer, TagSerializer

from .filters import BlogPostFilter, CategoryFilter, TagFilter
from .pagination import LargeResultsPagination, StandardResultsPagination

logger = logging.getLogger(__name__)

CACHE_SHORT = 60 * 5
CACHE_MEDIUM = 60 * 15
CACHE_LONG = 60 * 60


class PagesViewSet(ViewSet):
    """
    Returns individual site pages by their slug.
    """

    permission_classes = [AllowAny]

    _PAGE_MAP = {
        "home": (HomePage, HomePageSerializer),
        "about": (AboutPage, AboutPageSerializer),
        "contact": (ContactPage, ContactPageSerializer),
        "services": (ServicesPage, ServicesPageSerializer),
        "privacy-policy": (PrivacyPolicyPage, PrivacyPolicyPageSerializer),
        "terms": (TermsPage, TermsPageSerializer),
    }

    def list(self, request):
        """GET /api/v1/pages/ – list available page slugs."""
        return Response({"pages": list(self._PAGE_MAP.keys())})

    def retrieve(self, request, pk=None):
        """GET /api/v1/pages/<slug>/ – return a single page.
        Use 'home' for the home page: GET /api/v1/pages/home/
        """
        slug = pk or "home"
        cache_key = f"page:{slug}"
        cached = cache.get(cache_key)
        if cached:
            return Response(cached)

        mapping = self._PAGE_MAP.get(slug)
        if not mapping:
            return Response({"detail": "Page not found."}, status=404)

        model_cls, serializer_cls = mapping
        try:
            page = model_cls.objects.live().first()
        except model_cls.DoesNotExist:
            return Response({"detail": "Page not found."}, status=404)

        if not page:
            return Response({"detail": "Page not yet created in CMS."}, status=404)

        data = serializer_cls(page).data
        cache.set(cache_key, data, CACHE_MEDIUM)
        return Response(data)


class BlogViewSet(ReadOnlyModelViewSet):
    """
    GET /api/v1/blog/             → paginated post listing
    GET /api/v1/blog/<slug>/      → post detail
    GET /api/v1/blog/featured/    → featured posts
    GET /api/v1/blog/slugs/       → all slugs for generateStaticParams
    """

    permission_classes = [AllowAny]
    pagination_class = StandardResultsPagination
    filterset_class = BlogPostFilter
    search_fields = ["title", "excerpt"]
    ordering_fields = ["published_date", "title", "reading_time"]
    ordering = ["-published_date"]
    lookup_field = "slug"

    def get_queryset(self):
        return (
            BlogPage.objects.live()
            .public()
            .select_related("author", "cover_image", "featured_image")
            .prefetch_related("categories", "tags")
            .order_by("-published_date")
        )

    def get_serializer_class(self):
        if self.action == "retrieve":
            return BlogPostDetailSerializer
        return BlogPostMinimalSerializer

    def retrieve(self, request, slug=None, *args, **kwargs):
        cache_key = f"blog:detail:{slug}"
        cached = cache.get(cache_key)
        if cached:
            return Response(cached)

        try:
            post = self.get_queryset().get(slug=slug)
        except BlogPage.DoesNotExist:
            return Response({"detail": "Post not found."}, status=404)

        data = BlogPostDetailSerializer(post).data
        cache.set(cache_key, data, CACHE_SHORT)
        return Response(data)

    @action(detail=False, methods=["get"], url_path="featured")
    def featured(self, request):
        """GET /api/v1/blog/featured/ – featured posts."""
        posts = self.get_queryset().filter(is_featured=True)[:6]
        serializer = BlogPostMinimalSerializer(posts, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"], url_path="slugs")
    def slugs(self, request):
        """
        GET /api/v1/blog/slugs/
        Returns [{ slug }] for Next.js generateStaticParams.
        """
        slugs = BlogPage.objects.live().public().values_list("slug", flat=True)
        return Response([{"slug": s} for s in slugs])


class AuthorsViewSet(ReadOnlyModelViewSet):
    """
    GET /api/v1/authors/          → paginated author listing
    GET /api/v1/authors/<slug>/   → author detail + featured posts
    GET /api/v1/authors/slugs/    → all slugs for generateStaticParams
    """

    permission_classes = [AllowAny]
    pagination_class = StandardResultsPagination
    search_fields = ["title", "role"]
    ordering_fields = ["title"]
    ordering = ["title"]
    lookup_field = "slug"

    def get_queryset(self):
        return (
            AuthorPage.objects.live()
            .public()
            .select_related("photo")
            .order_by("title")
        )

    def get_serializer_class(self):
        if self.action == "retrieve":
            return AuthorSerializer
        return AuthorMinimalSerializer

    @action(detail=False, methods=["get"], url_path="slugs")
    def slugs(self, request):
        slugs = AuthorPage.objects.live().public().values_list("slug", flat=True)
        return Response([{"slug": s} for s in slugs])


class CategoriesViewSet(ReadOnlyModelViewSet):
    """
    GET /api/v1/categories/         → all categories
    GET /api/v1/categories/<slug>/  → category detail + posts
    GET /api/v1/categories/slugs/   → all slugs
    """

    permission_classes = [AllowAny]
    pagination_class = LargeResultsPagination
    filterset_class = CategoryFilter
    search_fields = ["name", "description"]
    ordering_fields = ["name", "order"]
    ordering = ["order", "name"]
    lookup_field = "slug"
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    @action(detail=True, methods=["get"], url_path="posts")
    def posts(self, request, slug=None):
        """GET /api/v1/categories/<slug>/posts/ – blog posts in this category."""
        try:
            category = Category.objects.get(slug=slug)
        except Category.DoesNotExist:
            return Response({"detail": "Category not found."}, status=404)

        posts = (
            BlogPage.objects.live()
            .public()
            .filter(categories=category)
            .select_related("author", "cover_image")
            .prefetch_related("categories", "tags")
            .order_by("-published_date")
        )
        page = self.paginate_queryset(posts)
        serializer = BlogPostMinimalSerializer(page, many=True)
        return self.get_paginated_response(serializer.data)

    @action(detail=False, methods=["get"], url_path="slugs")
    def slugs(self, request):
        slugs = Category.objects.values_list("slug", flat=True)
        return Response([{"slug": s} for s in slugs])


class TagsViewSet(ReadOnlyModelViewSet):
    """
    GET /api/v1/tags/           → all tags
    GET /api/v1/tags/<slug>/    → tag detail + posts
    GET /api/v1/tags/slugs/     → all slugs
    """

    permission_classes = [AllowAny]
    pagination_class = LargeResultsPagination
    filterset_class = TagFilter
    search_fields = ["name"]
    ordering_fields = ["name"]
    ordering = ["name"]
    lookup_field = "slug"
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

    @action(detail=True, methods=["get"], url_path="posts")
    def posts(self, request, slug=None):
        """GET /api/v1/tags/<slug>/posts/ – blog posts with this tag."""
        try:
            tag = Tag.objects.get(slug=slug)
        except Tag.DoesNotExist:
            return Response({"detail": "Tag not found."}, status=404)

        posts = (
            BlogPage.objects.live()
            .public()
            .filter(tags__name=tag.name)
            .select_related("author", "cover_image")
            .prefetch_related("categories", "tags")
            .order_by("-published_date")
        )
        page = self.paginate_queryset(posts)
        serializer = BlogPostMinimalSerializer(page, many=True)
        return self.get_paginated_response(serializer.data)

    @action(detail=False, methods=["get"], url_path="slugs")
    def slugs(self, request):
        slugs = Tag.objects.values_list("slug", flat=True)
        return Response([{"slug": s} for s in slugs])


class SiteSettingsView(APIView):
    """GET /api/v1/settings/ – global site settings."""

    permission_classes = [AllowAny]

    def get(self, request):
        from apps.seo.models import SiteSettings
        from apps.seo.serializers import SiteSettingsSerializer

        cache_key = "api:settings"
        cached = cache.get(cache_key)
        if cached:
            return Response(cached)

        site = request.site if hasattr(request, "site") else None
        settings_obj = SiteSettings.for_site(site) if site else None
        if not settings_obj:
            return Response({
                "site_name": "Blog",
                "site_description": "",
                "logo_url": None,
                "favicon_url": None,
                "default_og_image_url": None,
                "google_analytics_id": "",
                "google_tag_manager_id": "",
            })

        data = SiteSettingsSerializer(settings_obj).data
        cache.set(cache_key, data, CACHE_LONG)
        return Response(data)


class NavigationView(APIView):
    """GET /api/v1/navigation/ – header/footer menus + social links."""

    permission_classes = [AllowAny]

    def get(self, request):
        from apps.seo.models import MenuItem, NavigationSettings
        from apps.seo.serializers import NavigationSerializer

        cache_key = "api:navigation"
        cached = cache.get(cache_key)
        if cached:
            return Response(cached)

        site = request.site if hasattr(request, "site") else None
        nav = NavigationSettings.for_site(site) if site else None
        social_links = nav.social_links if nav else []

        data = {
            "header": MenuItem.objects.filter(menu="header").order_by("order"),
            "footer_primary": MenuItem.objects.filter(menu="footer_primary").order_by("order"),
            "footer_secondary": MenuItem.objects.filter(menu="footer_secondary").order_by("order"),
            "social_links": social_links,
        }
        serialized = NavigationSerializer(data).data
        cache.set(cache_key, serialized, CACHE_LONG)
        return Response(serialized)


class ContactInfoView(APIView):
    """GET /api/v1/contact-info/ – contact details from CMS."""

    permission_classes = [AllowAny]

    def get(self, request):
        from apps.seo.models import ContactSettings
        from apps.seo.serializers import ContactSettingsSerializer

        site = request.site if hasattr(request, "site") else None
        obj = ContactSettings.for_site(site) if site else None
        if not obj:
            return Response({"email": "", "phone": "", "address": ""})
        return Response(ContactSettingsSerializer(obj).data)