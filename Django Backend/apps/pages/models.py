"""
Core site page models.

HomePage         →  /
AboutPage        →  /about
ContactPage      →  /contact
ServicesPage     →  /services
PrivacyPolicyPage → /privacy-policy
TermsPage        →  /terms
"""
from django.db import models
from wagtail.admin.panels import (
    FieldPanel,
    FieldRowPanel,
    MultiFieldPanel,
    ObjectList,
    TabbedInterface,
)
from wagtail.fields import RichTextField, StreamField
from wagtail.models import Page
from wagtail.search import index

from apps.common.blocks import PAGE_BODY_BLOCKS
from apps.seo.models import SEOPageMixin


# ─────────────────────────────────────────────────────────────────────────────
# Home Page
# ─────────────────────────────────────────────────────────────────────────────

class HomePage(SEOPageMixin, Page):
    """
    Site home page.
    Frontend route: /
    """

    body = StreamField(
        PAGE_BODY_BLOCKS,
        use_json_field=True,
        blank=True,
        help_text="Drag-and-drop page sections.",
    )

    # Hero shortcut fields (optional – can also use HeroBlock inside body)
    hero_heading = models.CharField(max_length=255, blank=True)
    hero_subheading = models.TextField(blank=True)
    hero_cta_label = models.CharField(max_length=100, blank=True)
    hero_cta_url = models.CharField(max_length=255, blank=True)
    hero_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True, blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )

    content_panels = Page.content_panels + [
        MultiFieldPanel(
            [
                FieldPanel("hero_heading"),
                FieldPanel("hero_subheading"),
                FieldRowPanel([FieldPanel("hero_cta_label"), FieldPanel("hero_cta_url")]),
                FieldPanel("hero_image"),
            ],
            heading="Hero (shortcut)",
        ),
        FieldPanel("body"),
    ]

    promote_panels = Page.promote_panels + SEOPageMixin.seo_panels

    edit_handler = TabbedInterface(
        [
            ObjectList(content_panels, heading="Content"),
            ObjectList(promote_panels, heading="SEO"),
        ]
    )

    # Only one HomePage should exist at the root
    max_count = 1
    parent_page_types = ["wagtailcore.Page"]
    subpage_types = [
        "pages.AboutPage",
        "pages.ContactPage",
        "pages.ServicesPage",
        "pages.PrivacyPolicyPage",
        "pages.TermsPage",
        "blog.BlogIndexPage",
        "authors.AuthorIndexPage",
    ]

    class Meta:
        verbose_name = "Home Page"

    @property
    def hero_image_url(self):
        if self.hero_image:
            try:
                return self.hero_image.get_rendition("width-1600").url
            except Exception:
                return None
        return None


# ─────────────────────────────────────────────────────────────────────────────
# About Page
# ─────────────────────────────────────────────────────────────────────────────

class AboutPage(SEOPageMixin, Page):
    """Frontend route: /about"""

    intro = models.TextField(blank=True, max_length=500)
    body = StreamField(PAGE_BODY_BLOCKS, use_json_field=True, blank=True)

    content_panels = Page.content_panels + [
        FieldPanel("intro"),
        FieldPanel("body"),
    ]
    promote_panels = Page.promote_panels + SEOPageMixin.seo_panels
    edit_handler = TabbedInterface(
        [ObjectList(content_panels, heading="Content"), ObjectList(promote_panels, heading="SEO")]
    )

    max_count = 1
    parent_page_types = ["pages.HomePage", "wagtailcore.Page"]
    subpage_types = []

    class Meta:
        verbose_name = "About Page"


# ─────────────────────────────────────────────────────────────────────────────
# Contact Page
# ─────────────────────────────────────────────────────────────────────────────

class ContactPage(SEOPageMixin, Page):
    """Frontend route: /contact"""

    intro = models.TextField(blank=True, max_length=500)
    body = StreamField(PAGE_BODY_BLOCKS, use_json_field=True, blank=True)

    # Form destination
    form_submission_email = models.EmailField(
        blank=True,
        help_text="Email address to receive contact form submissions.",
    )
    success_message = models.TextField(
        blank=True,
        default="Thanks for reaching out! We'll get back to you soon.",
    )

    content_panels = Page.content_panels + [
        FieldPanel("intro"),
        FieldPanel("body"),
        FieldPanel("form_submission_email"),
        FieldPanel("success_message"),
    ]
    promote_panels = Page.promote_panels + SEOPageMixin.seo_panels
    edit_handler = TabbedInterface(
        [ObjectList(content_panels, heading="Content"), ObjectList(promote_panels, heading="SEO")]
    )

    max_count = 1
    parent_page_types = ["pages.HomePage", "wagtailcore.Page"]
    subpage_types = []

    class Meta:
        verbose_name = "Contact Page"


# ─────────────────────────────────────────────────────────────────────────────
# Services Page
# ─────────────────────────────────────────────────────────────────────────────

class ServicesPage(SEOPageMixin, Page):
    """Frontend route: /services"""

    intro = models.TextField(blank=True, max_length=500)
    body = StreamField(PAGE_BODY_BLOCKS, use_json_field=True, blank=True)

    content_panels = Page.content_panels + [
        FieldPanel("intro"),
        FieldPanel("body"),
    ]
    promote_panels = Page.promote_panels + SEOPageMixin.seo_panels
    edit_handler = TabbedInterface(
        [ObjectList(content_panels, heading="Content"), ObjectList(promote_panels, heading="SEO")]
    )

    max_count = 1
    parent_page_types = ["pages.HomePage", "wagtailcore.Page"]
    subpage_types = []

    class Meta:
        verbose_name = "Services Page"


# ─────────────────────────────────────────────────────────────────────────────
# Privacy Policy Page
# ─────────────────────────────────────────────────────────────────────────────

class PrivacyPolicyPage(SEOPageMixin, Page):
    """Frontend route: /privacy-policy"""

    last_updated = models.DateField(
        null=True, blank=True,
        help_text="Date the policy was last updated.",
    )
    body = StreamField(PAGE_BODY_BLOCKS, use_json_field=True, blank=True)

    content_panels = Page.content_panels + [
        FieldPanel("last_updated"),
        FieldPanel("body"),
    ]
    promote_panels = Page.promote_panels + SEOPageMixin.seo_panels
    edit_handler = TabbedInterface(
        [ObjectList(content_panels, heading="Content"), ObjectList(promote_panels, heading="SEO")]
    )

    max_count = 1
    parent_page_types = ["pages.HomePage", "wagtailcore.Page"]
    subpage_types = []

    class Meta:
        verbose_name = "Privacy Policy Page"


# ─────────────────────────────────────────────────────────────────────────────
# Terms Page
# ─────────────────────────────────────────────────────────────────────────────

class TermsPage(SEOPageMixin, Page):
    """Frontend route: /terms"""

    last_updated = models.DateField(null=True, blank=True)
    body = StreamField(PAGE_BODY_BLOCKS, use_json_field=True, blank=True)

    content_panels = Page.content_panels + [
        FieldPanel("last_updated"),
        FieldPanel("body"),
    ]
    promote_panels = Page.promote_panels + SEOPageMixin.seo_panels
    edit_handler = TabbedInterface(
        [ObjectList(content_panels, heading="Content"), ObjectList(promote_panels, heading="SEO")]
    )

    max_count = 1
    parent_page_types = ["pages.HomePage", "wagtailcore.Page"]
    subpage_types = []

    class Meta:
        verbose_name = "Terms Page"
