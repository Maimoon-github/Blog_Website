# apps/pages/api.py
"""
Wagtail API v2 endpoint orchestration layer with Polymorphic DRF Serializer mapping.
"""
from wagtail.api.v2.views import PagesAPIViewSet as BaseViewSet
from apps.pages.models import HomePage, AboutPage, ContactPage, ServicesPage, PrivacyPolicyPage, TermsPage
from apps.pages import serializers

class PagesAPIViewSet(BaseViewSet):
    """
    Enhanced API ViewSet that intercepts requests and serves targeted custom
    Django REST Framework serializers based on specific page classes.
    """

    def get_queryset(self):
        # Prevent ingestion of non-live or restricted workspace items
        return super().get_queryset().live().public()

    def get_serializer_class(self):
        """
        Dynamic Factory resolution mapping models to their specific DRF schema structures.
        """
        # If looking at a detailed page instance query, resolve the specific subclass
        if hasattr(self, 'action') and self.action == 'detail_view':
            try:
                instance = self.get_object()
                model_class = instance.specific_class

                mapping = {
                    HomePage: serializers.HomePageSerializer,
                    AboutPage: serializers.AboutPageSerializer,
                    ContactPage: serializers.ContactPageSerializer,
                    ServicesPage: serializers.ServicesPageSerializer,
                    PrivacyPolicyPage: serializers.PrivacyPolicyPageSerializer,
                    TermsPage: serializers.TermsPageSerializer,
                }

                if model_class in mapping:
                    return mapping[model_class]
            except Exception:
                pass

        return super().get_serializer_class()