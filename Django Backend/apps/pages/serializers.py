"""
Serializers for core site pages.
"""
from rest_framework import serializers
from wagtail.rich_text import expand_db_html

from apps.seo.serializers import SEOSerializer

from .models import AboutPage, ContactPage, HomePage, PrivacyPolicyPage, ServicesPage, TermsPage


def serialize_streamfield_body(page):
    """Convert a page's StreamField body to a JSON-safe list."""
    blocks = []
    for block in page.body:
        block_data = {"type": block.block_type, "id": str(block.id) if block.id else None}
        if block.block_type in ("rich_text", "paragraph"):
            try:
                raw = block.value.source if hasattr(block.value, "source") else str(block.value)
                block_data["value"] = expand_db_html(raw)
            except Exception:
                block_data["value"] = str(block.value)
        else:
            block_data["value"] = block.value
        blocks.append(block_data)
    return blocks


class HomePageSerializer(serializers.ModelSerializer):
    body = serializers.SerializerMethodField()
    seo = serializers.SerializerMethodField()
    hero_image_url = serializers.ReadOnlyField()

    class Meta:
        model = HomePage
        fields = [
            "id", "title", "slug",
            "hero_heading", "hero_subheading",
            "hero_cta_label", "hero_cta_url", "hero_image_url",
            "body", "seo",
        ]

    def get_body(self, obj): return serialize_streamfield_body(obj)
    def get_seo(self, obj): return SEOSerializer(obj).data


class AboutPageSerializer(serializers.ModelSerializer):
    body = serializers.SerializerMethodField()
    seo = serializers.SerializerMethodField()

    class Meta:
        model = AboutPage
        fields = ["id", "title", "slug", "intro", "body", "seo"]

    def get_body(self, obj): return serialize_streamfield_body(obj)
    def get_seo(self, obj): return SEOSerializer(obj).data


class ContactPageSerializer(serializers.ModelSerializer):
    body = serializers.SerializerMethodField()
    seo = serializers.SerializerMethodField()

    class Meta:
        model = ContactPage
        fields = [
            "id", "title", "slug", "intro", "body",
            "form_submission_email", "success_message", "seo",
        ]

    def get_body(self, obj): return serialize_streamfield_body(obj)
    def get_seo(self, obj): return SEOSerializer(obj).data


class ServicesPageSerializer(serializers.ModelSerializer):
    body = serializers.SerializerMethodField()
    seo = serializers.SerializerMethodField()

    class Meta:
        model = ServicesPage
        fields = ["id", "title", "slug", "intro", "body", "seo"]

    def get_body(self, obj): return serialize_streamfield_body(obj)
    def get_seo(self, obj): return SEOSerializer(obj).data


class PrivacyPolicyPageSerializer(serializers.ModelSerializer):
    body = serializers.SerializerMethodField()
    seo = serializers.SerializerMethodField()

    class Meta:
        model = PrivacyPolicyPage
        fields = ["id", "title", "slug", "last_updated", "body", "seo"]

    def get_body(self, obj): return serialize_streamfield_body(obj)
    def get_seo(self, obj): return SEOSerializer(obj).data


class TermsPageSerializer(serializers.ModelSerializer):
    body = serializers.SerializerMethodField()
    seo = serializers.SerializerMethodField()

    class Meta:
        model = TermsPage
        fields = ["id", "title", "slug", "last_updated", "body", "seo"]

    def get_body(self, obj): return serialize_streamfield_body(obj)
    def get_seo(self, obj): return SEOSerializer(obj).data
