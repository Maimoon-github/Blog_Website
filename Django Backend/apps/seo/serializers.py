"""
SEO serializers – used by all page-level API serializers.
"""
from rest_framework import serializers

from .models import ContactSettings, MenuItem, NavigationSettings, SiteSettings


class SEOSerializer(serializers.Serializer):
    """
    Serializes SEO fields from any object that uses SEOPageMixin.
    Intended to be nested inside page serializers.
    """

    # Meta
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    canonical_url = serializers.URLField(allow_blank=True)
    robots = serializers.CharField()

    # OpenGraph
    og_title = serializers.SerializerMethodField()
    og_description = serializers.SerializerMethodField()
    og_image = serializers.SerializerMethodField()
    og_type = serializers.CharField()

    # Twitter
    twitter_title = serializers.SerializerMethodField()
    twitter_description = serializers.SerializerMethodField()
    twitter_image = serializers.SerializerMethodField()
    twitter_card = serializers.CharField()

    # Structured data
    schema_json = serializers.SerializerMethodField()

    def get_title(self, obj):
        return getattr(obj, "seo_title", None) or getattr(obj, "title", "")

    def get_description(self, obj):
        desc = getattr(obj, "seo_description", "")
        if not desc:
            desc = getattr(obj, "excerpt", "") or getattr(obj, "intro", "")
        return desc

    def get_og_title(self, obj):
        return obj.og_title or self.get_title(obj)

    def get_og_description(self, obj):
        return obj.og_description or self.get_description(obj)

    def get_og_image(self, obj):
        return getattr(obj, "resolved_og_image_url", None)

    def get_twitter_title(self, obj):
        return obj.twitter_title or self.get_og_title(obj)

    def get_twitter_description(self, obj):
        return obj.twitter_description or self.get_og_description(obj)

    def get_twitter_image(self, obj):
        img = obj.twitter_image
        if img:
            try:
                return img.get_rendition("fill-1200x600").url
            except Exception:
                return img.file.url
        return self.get_og_image(obj)

    def get_schema_json(self, obj):
        return obj.get_schema_json() if hasattr(obj, "get_schema_json") else None


class MenuItemSerializer(serializers.ModelSerializer):
    href = serializers.ReadOnlyField()

    class Meta:
        model = MenuItem
        fields = ["id", "menu", "label", "href", "open_in_new_tab", "order"]


class SiteSettingsSerializer(serializers.ModelSerializer):
    logo_url = serializers.SerializerMethodField()
    favicon_url = serializers.SerializerMethodField()
    default_og_image_url = serializers.SerializerMethodField()

    class Meta:
        model = SiteSettings
        fields = [
            "site_name",
            "site_description",
            "logo_url",
            "favicon_url",
            "default_og_image_url",
            "google_analytics_id",
            "google_tag_manager_id",
        ]

    def get_logo_url(self, obj):
        if obj.site_logo:
            try:
                return obj.site_logo.get_rendition("original").url
            except Exception:
                return None
        return None

    def get_favicon_url(self, obj):
        if obj.site_favicon:
            try:
                return obj.site_favicon.get_rendition("original").url
            except Exception:
                return None
        return None

    def get_default_og_image_url(self, obj):
        if obj.default_og_image:
            try:
                return obj.default_og_image.get_rendition("fill-1200x630").url
            except Exception:
                return None
        return None


class NavigationSerializer(serializers.Serializer):
    """Returns header + footer menus + social links."""

    header = MenuItemSerializer(many=True)
    footer_primary = MenuItemSerializer(many=True)
    footer_secondary = MenuItemSerializer(many=True)
    social_links = serializers.ListField(child=serializers.DictField())


class ContactSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSettings
        fields = ["email", "phone", "address"]
