"""
Root URL configuration.

All frontend rendering is handled by Next.js.
This backend only exposes:
  - /cms/          → Wagtail admin
  - /api/          → REST API (DRF + Wagtail API v2)
  - /api/docs/     → OpenAPI / Swagger
  - /django-admin/ → Django admin (restricted to staff) – commented out
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)
from wagtail import urls as wagtail_urls
from wagtail.admin import urls as wagtailadmin_urls
from wagtail.api.v2.router import WagtailAPIRouter
from wagtail.documents import urls as wagtaildocs_urls
from wagtail.images.api.v2.views import ImagesAPIViewSet

# ─── Wagtail API v2 router ────────────────────────────────────────────────────
from apps.blog.api import BlogPageAPIViewSet
from apps.pages.api import PagesAPIViewSet
from apps.authors.api import AuthorPageAPIViewSet

wagtail_api_router = WagtailAPIRouter("wagtailapi")
wagtail_api_router.register_endpoint("pages", PagesAPIViewSet)
wagtail_api_router.register_endpoint("images", ImagesAPIViewSet)
wagtail_api_router.register_endpoint("blog", BlogPageAPIViewSet)
wagtail_api_router.register_endpoint("authors", AuthorPageAPIViewSet)

# Unpack the 3‑tuple returned by wagtail_api_router.urls
router_urls = wagtail_api_router.urls

# ─── URL patterns ─────────────────────────────────────────────────────────────
urlpatterns = [
    # Django admin (commented out – use Wagtail admin at /cms/)
    # path("django-admin/", admin.site.urls),

    # Wagtail admin – single inclusion (no namespace needed)
    path("cms/", include(wagtailadmin_urls)),

    # Wagtail documents
    path("documents/", include(wagtaildocs_urls)),

    # Wagtail API v2  →  /api/wagtail/
    path("api/wagtail/", include((router_urls[0], router_urls[1]), namespace=router_urls[2])),

    # Custom DRF API  →  /api/v1/
    path("api/v1/", include("apps.api.urls", namespace="v1")),

    # Search API (also under v1)
    path("api/v1/search/", include("apps.search.urls")),

    # OpenAPI schema + docs
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/swagger/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
    path("api/docs/redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),

    # Wagtail headless preview (no 'urls' module in installed package)
    # path("api/preview/", include("wagtail_headless_preview.urls")),
]

# ─── Development extras ───────────────────────────────────────────────────────
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

    try:
        import debug_toolbar
        urlpatterns = [path("__debug__/", include(debug_toolbar.urls))] + urlpatterns
    except ImportError:
        pass