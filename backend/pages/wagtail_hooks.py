from django.core.cache import cache
from django.contrib.contenttypes.models import ContentType
from django.urls import reverse
from wagtail import hooks
from wagtail.admin.menu import MenuItem
from wagtail.models import Page

from .models import (
    HomePage,
    AboutPage,
    ServicesPage,
    ContactPage,
    PrivacyPolicyPage,
    TermsPage,
)

# All models in the pages app
PAGE_MODELS = [HomePage, AboutPage, ServicesPage, ContactPage, PrivacyPolicyPage, TermsPage]


@hooks.register("register_admin_menu_item")
def register_pages_menu_item():
    """
    Quick shortcut to the page explorer showing only static site pages.
    It links directly to the HomePage children view (filtered via
    construct_explorer_page_queryset).
    """
    home_page = HomePage.objects.first()
    if not home_page:
        # Fallback to generic explorer if no HomePage exists yet
        return MenuItem("Pages", reverse("wagtailadmin_explore_root"), icon_name="doc-empty")

    return MenuItem(
        "Pages",
        reverse("wagtailadmin_explore", args=[home_page.pk]),
        icon_name="doc-empty",
        order=100,
    )


@hooks.register("after_publish_page")
def clear_static_pages_cache(request, page):
    """
    Clear relevant API cache entries when a static page is published.
    """
    if not isinstance(page, tuple(PAGE_MODELS)):
        return

    # Invalidate home endpoint and the specific slug endpoint
    cache.delete("api_pages_home")  # key used by HomePageAPIView if cached
    cache.delete(f"api_pages_detail_{page.slug}")  # key used by StaticPageAPIView if cached
    # You can extend with cache.delete_pattern("api_pages_*") if using a shared pattern


@hooks.register("construct_page_chooser_queryset")
def restrict_page_chooser_to_pages_app(queryset, request):
    """
    Only show pages belonging to the pages app in all page choosers.
    """
    allowed_content_types = ContentType.objects.get_for_models(*PAGE_MODELS).values()
    return queryset.filter(content_type__in=allowed_content_types)