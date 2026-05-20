from django.db import models
from wagtail.admin.panels import FieldPanel, MultiFieldPanel
from wagtail.fields import RichTextField, StreamField
from wagtail.models import Page

from core.models import AbstractBasePage  # shared base page with SEO, etc.
from .blocks import TeamMemberBlock, ServiceItemBlock


# ----------------------------------------------------------------------
# HomePage
# ----------------------------------------------------------------------
class HomePage(AbstractBasePage):
    hero_title = models.CharField(max_length=255, blank=True)
    hero_subtitle = models.CharField(max_length=500, blank=True)
    hero_cta_text = models.CharField(max_length=100, blank=True)
    hero_cta_url = models.CharField(max_length=500, blank=True)
    featured_posts = models.ManyToManyField(
        "blog.BlogPage",  # assuming blog app exists
        blank=True,
        related_name="+",
    )

    content_panels = AbstractBasePage.content_panels + [
        MultiFieldPanel(
            [
                FieldPanel("hero_title"),
                FieldPanel("hero_subtitle"),
                FieldPanel("hero_cta_text"),
                FieldPanel("hero_cta_url"),
            ],
            heading="Hero Section",
        ),
        FieldPanel("featured_posts"),
    ]

    parent_page_types = ["wagtailcore.Page"]  # only under root
    subpage_types = [
        "pages.AboutPage",
        "pages.ServicesPage",
        "pages.ContactPage",
        "pages.PrivacyPolicyPage",
        "pages.TermsPage",
    ]

    template = "pages/home_page.html"

    class Meta:
        verbose_name = "Home Page"


# ----------------------------------------------------------------------
# AboutPage
# ----------------------------------------------------------------------
class AboutPage(AbstractBasePage):
    body = StreamField(
        [
            ("heading", blocks.CharBlock(form_classname="title")),
            ("paragraph", blocks.RichTextBlock()),
            ("image", ImageChooserBlock()),
        ],
        use_json_field=True,
        blank=True,
    )
    team_members = StreamField(
        [("member", TeamMemberBlock())],
        use_json_field=True,
        blank=True,
    )

    content_panels = AbstractBasePage.content_panels + [
        FieldPanel("body"),
        FieldPanel("team_members"),
    ]

    parent_page_types = ["pages.HomePage"]
    subpage_types = []

    template = "pages/about_page.html"


# ----------------------------------------------------------------------
# ServicesPage
# ----------------------------------------------------------------------
class ServicesPage(AbstractBasePage):
    intro = RichTextField(blank=True)
    services_list = StreamField(
        [("service", ServiceItemBlock())],
        use_json_field=True,
        blank=True,
    )

    content_panels = AbstractBasePage.content_panels + [
        FieldPanel("intro"),
        FieldPanel("services_list"),
    ]

    parent_page_types = ["pages.HomePage"]
    subpage_types = []

    template = "pages/services_page.html"


# ----------------------------------------------------------------------
# ContactPage
# ----------------------------------------------------------------------
class ContactPage(AbstractBasePage):
    email = models.CharField(max_length=255, blank=True)
    phone = models.CharField(max_length=50, blank=True)
    address = models.CharField(max_length=500, blank=True)
    form_id = models.CharField(max_length=100, blank=True, help_text="External form identifier")

    content_panels = AbstractBasePage.content_panels + [
        MultiFieldPanel(
            [
                FieldPanel("email"),
                FieldPanel("phone"),
                FieldPanel("address"),
            ],
            heading="Contact Details",
        ),
        FieldPanel("form_id"),
    ]

    parent_page_types = ["pages.HomePage"]
    subpage_types = []

    template = "pages/contact_page.html"


# ----------------------------------------------------------------------
# PrivacyPolicyPage
# ----------------------------------------------------------------------
class PrivacyPolicyPage(AbstractBasePage):
    body = RichTextField(blank=True)
    last_updated = models.DateField(blank=True, null=True)

    content_panels = AbstractBasePage.content_panels + [
        FieldPanel("body"),
        FieldPanel("last_updated"),
    ]

    parent_page_types = ["pages.HomePage"]
    subpage_types = []

    template = "pages/privacy_policy_page.html"


# ----------------------------------------------------------------------
# TermsPage
# ----------------------------------------------------------------------
class TermsPage(AbstractBasePage):
    body = RichTextField(blank=True)
    last_updated = models.DateField(blank=True, null=True)

    content_panels = AbstractBasePage.content_panels + [
        FieldPanel("body"),
        FieldPanel("last_updated"),
    ]

    parent_page_types = ["pages.HomePage"]
    subpage_types = []

    template = "pages/terms_page.html"