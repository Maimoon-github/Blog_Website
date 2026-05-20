from rest_framework import serializers

from core.serializers import BasePageSerializer  # shared serializer with id,title,slug,seo...
from .models import (
    HomePage,
    AboutPage,
    ServicesPage,
    ContactPage,
    PrivacyPolicyPage,
    TermsPage,
)


class HomePageSerializer(BasePageSerializer):
    class Meta(BasePageSerializer.Meta):
        model = HomePage
        fields = BasePageSerializer.Meta.fields + [
            "hero_title",
            "hero_subtitle",
            "hero_cta_text",
            "hero_cta_url",
            "featured_posts",
        ]


class AboutPageSerializer(BasePageSerializer):
    class Meta(BasePageSerializer.Meta):
        model = AboutPage
        fields = BasePageSerializer.Meta.fields + ["body", "team_members"]


class ServicesPageSerializer(BasePageSerializer):
    class Meta(BasePageSerializer.Meta):
        model = ServicesPage
        fields = BasePageSerializer.Meta.fields + ["intro", "services_list"]


class ContactPageSerializer(BasePageSerializer):
    class Meta(BasePageSerializer.Meta):
        model = ContactPage
        fields = BasePageSerializer.Meta.fields + ["email", "phone", "address", "form_id"]


class PrivacyPolicyPageSerializer(BasePageSerializer):
    class Meta(BasePageSerializer.Meta):
        model = PrivacyPolicyPage
        fields = BasePageSerializer.Meta.fields + ["body", "last_updated"]


class TermsPageSerializer(BasePageSerializer):
    class Meta(BasePageSerializer.Meta):
        model = TermsPage
        fields = BasePageSerializer.Meta.fields + ["body", "last_updated"]