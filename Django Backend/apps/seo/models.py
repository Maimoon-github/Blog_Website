# apps/seo/models.py
"""
SEO models.

SEOPageMixin  ─ Mixin for any Wagtail Page that needs full SEO control.
SiteSettings  ─ Global site settings (name, logo, analytics, contact info).
NavigationSettings ─ Header/footer menus, social links.
"""
import json

from django.db import models
from django.utils.functional import cached_property
from wagtail.admin.panels import FieldPanel, FieldRowPanel, MultiFieldPanel, ObjectList, TabbedInterface
from wagtail.contrib.settings.models import BaseSiteSetting, register_setting
from wagtail.fields import RichTextField
from wagtail.images.models import AbstractImage
from wagtail.models import Page
from wagtail.snippets.models import register_snippet


# ─────────────────────────────────────────────────────────────────────────────
# SEO Mixin
# ─────────────────────────────────────────────────────────────────────────────

class SEOPageMixin(models.Model):
    """
    Abstract mixin – add to any Wagtail Page to get full SEO control.

    Fields added:
      Meta       : seo_title (from Wagtail core), seo_description, canonical_url, robots
      OpenGraph  : og_title, og_description, og_image, og_type
      Twitter    : twitter_title, twitter_description, twitter_image, twitter_card
      JSON-LD    : schema_json (raw JSON-LD blob, validated on save)
    """

    # ── Meta ──────────────────────────────────────────────────────────────────
    seo_description = models.TextField(
        blank=True,
        verbose_name="Meta description",
        help_text="~155 characters. Falls back to excerpt / intro if blank.",
    )
    canonical_url = models.URLField(
        blank=True,
        verbose_name="Canonical URL",
        help_text="Leave blank to use the page's own URL.",
    )
    robots = models.CharField(
        max_length=100,
        blank=True,
        default="index, follow",
        verbose_name="Robots directive",
        help_text="e.g. 'noindex, nofollow'",
    )

    # ── OpenGraph ─────────────────────────────────────────────────────────────
    og_title = models.CharField(
        max_length=255,
        blank=True,
        verbose_name="OG title",
        help_text="Defaults to page title if blank.",
    )
    og_description = models.TextField(
        blank=True,
        verbose_name="OG description",
    )
    og_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
        verbose_name="OG image",
        help_text="Recommended: 1200×630 px.",
    )
    og_type = models.CharField(
        max_length=50,
        default="website",
        blank=True,
        verbose_name="OG type",
        help_text="e.g. website, article, profile",
    )

    # ── Twitter / X ───────────────────────────────────────────────────────────
    twitter_title = models.CharField(max_length=255, blank=True, verbose_name="Twitter title")
    twitter_description = models.TextField(blank=True, verbose_name="Twitter description")
    twitter_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
        verbose_name="Twitter image",
    )
    twitter_card = models.CharField(
        max_length=30,
        default="summary_large_image",
        choices=[
            ("summary", "Summary"),
            ("summary_large_image", "Summary (large image)"),
            ("app", "App"),
            ("player", "Player"),
        ],
        verbose_name="Twitter card type",
    )

    # ── Structured data ───────────────────────────────────────────────────────
    schema_json = models.TextField(
        blank=True,
        verbose_name="JSON-LD structured data",
        help_text="Paste raw JSON-LD (will be validated). Leave blank for auto-generated schema.",
    )

    # ── Wagtail admin panels ──────────────────────────────────────────────────
    seo_panels = [
        MultiFieldPanel(
            [
                FieldPanel("seo_description"),
                FieldPanel("canonical_url"),
                FieldPanel("robots"),
            ],
            heading="Meta",
        ),
        MultiFieldPanel(
            [
                FieldPanel("og_title"),
                FieldPanel("og_description"),
                FieldPanel("og_image"),
                FieldPanel("og_type"),
            ],
            heading="Open Graph",
        ),
        MultiFieldPanel(
            [
                FieldPanel("twitter_title"),
                FieldPanel("twitter_description"),
                FieldPanel("twitter_image"),
                FieldPanel("twitter_card"),
            ],
            heading="Twitter / X",
        ),
        MultiFieldPanel(
            [FieldPanel("schema_json")],
            heading="Structured Data (JSON-LD)",
        ),
    ]

    @cached_property
    def resolved_og_image_url(self):
        image = self.og_image
        if image:
            try:
                return image.get_rendition("fill-1200x630").url
            except Exception:
                return image.file.url
        return None

    @cached_property
    def resolved_seo_title(self):
        return self.seo_title or self.title  # seo_title from Wagtail core

    @cached_property
    def resolved_og_title(self):
        return self.og_title or self.resolved_seo_title

    @cached_property
    def resolved_twitter_title(self):
        return self.twitter_title or self.resolved_og_title

    def get_schema_json(self):
        """Return parsed JSON-LD or None."""
        if self.schema_json:
            try:
                return json.loads(self.schema_json)
            except json.JSONDecodeError:
                return None
        return None

    class Meta:
        abstract = True


# ─────────────────────────────────────────────────────────────────────────────
# Global site settings
# ─────────────────────────────────────────────────────────────────────────────

@register_setting
class SiteSettings(BaseSiteSetting):
    """Global site-wide settings editable from Wagtail admin → Settings."""

    # Identity
    site_name = models.CharField(max_length=255, blank=True)
    site_description = models.TextField(blank=True)
    site_logo = models.ForeignKey(
        "wagtailimages.Image",
        null=True, blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
        verbose_name="Site logo",
    )
    site_favicon = models.ForeignKey(
        "wagtailimages.Image",
        null=True, blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
        verbose_name="Site favicon",
    )
    default_og_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True, blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
        verbose_name="Default OG image",
    )

    # Analytics
    google_analytics_id = models.CharField(
        max_length=50, blank=True,
        help_text="GA4 Measurement ID (G-XXXXXXXXXX)",
    )
    google_tag_manager_id = models.CharField(
        max_length=50, blank=True,
        help_text="GTM Container ID (GTM-XXXXXXX)",
    )

    panels = [
        MultiFieldPanel(
            [
                FieldPanel("site_name"),
                FieldPanel("site_description"),
                FieldPanel("site_logo"),
                FieldPanel("site_favicon"),
                FieldPanel("default_og_image"),
            ],
            heading="Site Identity",
        ),
        MultiFieldPanel(
            [
                FieldPanel("google_analytics_id"),
                FieldPanel("google_tag_manager_id"),
            ],
            heading="Analytics",
        ),
    ]

    class Meta:
        verbose_name = "Site Settings"


@register_setting
class ContactSettings(BaseSiteSetting):
    """Contact details editable from Wagtail admin."""

    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=30, blank=True)
    address = models.TextField(blank=True)

    panels = [
        FieldPanel("email"),
        FieldPanel("phone"),
        FieldPanel("address"),
    ]

    class Meta:
        verbose_name = "Contact Information"


# ─────────────────────────────────────────────────────────────────────────────
# Navigation settings
# ─────────────────────────────────────────────────────────────────────────────

class NavItemBlock(models.Model):
    """Intermediate model for nav items (used as an inline/snippet)."""

    label = models.CharField(max_length=100)
    url = models.CharField(max_length=255, blank=True, help_text="External URL or relative path")
    page = models.ForeignKey(
        "wagtailcore.Page",
        null=True, blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )
    open_in_new_tab = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]
        abstract = True


@register_setting
class NavigationSettings(BaseSiteSetting):
    """Header navigation, footer links, and social media links."""

    # Social links stored as JSON for flexibility
    social_links_json = models.TextField(
        blank=True,
        default="[]",
        help_text=(
            'JSON array of social links. Example: '
            '[{"platform": "twitter", "url": "https://twitter.com/..."}]'
        ),
    )

    panels = [
        FieldPanel("social_links_json"),
    ]

    @property
    def social_links(self):
        try:
            import json
            return json.loads(self.social_links_json)
        except Exception:
            return []

    class Meta:
        verbose_name = "Navigation"


@register_snippet
class MenuItem(models.Model):
    """A single navigation item, grouped by menu location."""

    MENU_CHOICES = [
        ("header", "Header"),
        ("footer_primary", "Footer – primary"),
        ("footer_secondary", "Footer – secondary"),
    ]

    menu = models.CharField(max_length=30, choices=MENU_CHOICES, db_index=True)
    label = models.CharField(max_length=100)
    url = models.CharField(max_length=255, blank=True)
    page = models.ForeignKey(
        "wagtailcore.Page",
        null=True, blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )
    open_in_new_tab = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)

    panels = [
        FieldPanel("menu"),
        FieldPanel("label"),
        FieldPanel("url"),
        FieldPanel("page"),
        FieldPanel("open_in_new_tab"),
        FieldPanel("order"),
    ]

    class Meta:
        ordering = ["menu", "order"]
        verbose_name = "Menu Item"
        verbose_name_plural = "Menu Items"

    def __str__(self):
        return f"{self.get_menu_display()} – {self.label}"

    @property
    def href(self):
        if self.page:
            return self.page.url
        return self.url