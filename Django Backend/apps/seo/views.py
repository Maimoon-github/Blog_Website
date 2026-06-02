# apps/seo/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from wagtail.models import Site
from .models import SiteSettings, ContactSettings, MenuItem, NavigationSettings
from .serializers import (
    SiteSettingsSerializer, 
    ContactSettingsSerializer, 
    MenuItemSerializer, 
    NavigationSerializer
)

class GlobalConfigAPIView(APIView):
    """
    API View to aggregate global site configurations, contact parameters, 
    and multi-tier menus into a single high-performance payload.
    """
    def get(self, request, *args, **kwargs):
        # Resolve the active site based on request host criteria
        current_site = Site.find_for_request(request)
        if not current_site:
            return Response(
                {"error": "No configured active site context discovered."}, 
                status=status.HTTP_404_NOT_FOUND
            )

        # Retrieve setting records tied specifically to the resolved site context
        site_settings = SiteSettings.for_site(current_site)
        contact_settings = ContactSettings.for_site(current_site)
        nav_settings = NavigationSettings.for_site(current_site)

        # Retrieve organized snippet menu list arrays
        menu_items = MenuItem.objects.filter(page__in=current_site.root_page.get_descendants(inclusive=True)) if current_site.root_page else MenuItem.objects.all()
        
        header_items = menu_items.filter(menu="header")
        footer_primary = menu_items.filter(menu="footer_primary")
        footer_secondary = menu_items.filter(menu="footer_secondary")

        # Compile cross-sectional composition payload
        navigation_data = {
            "header": header_items,
            "footer_primary": footer_primary,
            "footer_secondary": footer_secondary,
            "social_links": nav_settings.social_links
        }

        return Response({
            "site_identity": SiteSettingsSerializer(site_settings, context={'request': request}).data,
            "contact_information": ContactSettingsSerializer(contact_settings).data,
            "navigation": NavigationSerializer(navigation_data, context={'request': request}).data
        }, status=status.HTTP_200_OK)