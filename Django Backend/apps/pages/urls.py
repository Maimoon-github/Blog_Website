# urls.py
"""
Global URL Configuration routing map for the headless layout backend.
"""
from django.urls import path, include
from wagtail.api.v2.router import WagtailAPIRouter
from wagtail import urls as wagtail_urls
from apps.pages.api import PagesAPIViewSet

# Instantiate a Wagtail API Routing controller
api_router = WagtailAPIRouter('api')

# Register our custom viewset context under the 'pages' path alias
api_router.register_endpoint('pages', PagesAPIViewSet)

urlpatterns = [
    # Expose headless layout endpoints via pathing /api/v2/pages/
    path('api/v2/', api_router.urls),

    # Standard Wagtail page fallback router for handling administrative views
    path('', include(wagtail_urls)),
]