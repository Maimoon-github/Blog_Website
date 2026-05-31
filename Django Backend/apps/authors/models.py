"""
Author models.

AuthorIndexPage  →  /authors
AuthorPage       →  /authors/[slug]
"""
from django.db import models
from wagtail.admin.panels import FieldPanel, FieldRowPanel, InlinePanel, MultiFieldPanel, ObjectList, TabbedInterface
from wagtail.fields import RichTextField
from wagtail.models import Page
from wagtail.search import index

from apps.seo.models import SEOPageMixin


class AuthorIndexPage(Page):
    """
    Listing page for all authors.
    Frontend route: /authors
    """

    intro = RichTextField(blank=True)

    content_panels = Page.content_panels + [
        FieldPanel("intro"),
    ]

    subpage_types = ["authors.AuthorPage"]
    parent_page_types = ["wagtailcore.Page", "pages.HomePage"]

    class Meta:
        verbose_name = "Author Index Page"

    def get_authors(self):
        return AuthorPage.objects.live().descendant_of(self).order_by("title")

    def get_api_representation(self, value, context=None):
        return {}


class AuthorPage(SEOPageMixin, Page):
    """
    Individual author profile page.
    Frontend route: /authors/[slug]
    """

    # ── Profile ───────────────────────────────────────────────────────────────
    photo = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
        verbose_name="Author photo",
    )
    role = models.CharField(max_length=200, blank=True, verbose_name="Job title / role")
    bio = RichTextField(blank=True, features=["bold", "italic", "link", "ol", "ul"])
    short_bio = models.TextField(
        blank=True,
        max_length=300,
        help_text="Brief bio shown in blog post bylines (max 300 chars)",
    )

    # ── Social links ──────────────────────────────────────────────────────────
    twitter_url = models.URLField(blank=True, verbose_name="Twitter / X URL")
    linkedin_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    website_url = models.URLField(blank=True, verbose_name="Personal website")
    instagram_url = models.URLField(blank=True)
    youtube_url = models.URLField(blank=True)

    # ── Search index ──────────────────────────────────────────────────────────
    search_fields = Page.search_fields + [
        index.SearchField("bio"),
        index.SearchField("role"),
        index.FilterField("slug"),
    ]

    # ── Admin panels ──────────────────────────────────────────────────────────
    content_panels = Page.content_panels + [
        MultiFieldPanel(
            [
                FieldPanel("photo"),
                FieldPanel("role"),
                FieldPanel("short_bio"),
                FieldPanel("bio"),
            ],
            heading="Profile",
        ),
        MultiFieldPanel(
            [
                FieldRowPanel([FieldPanel("twitter_url"), FieldPanel("linkedin_url")]),
                FieldRowPanel([FieldPanel("github_url"), FieldPanel("website_url")]),
                FieldRowPanel([FieldPanel("instagram_url"), FieldPanel("youtube_url")]),
            ],
            heading="Social Links",
        ),
    ]

    promote_panels = Page.promote_panels + SEOPageMixin.seo_panels

    edit_handler = TabbedInterface(
        [
            ObjectList(content_panels, heading="Content"),
            ObjectList(promote_panels, heading="SEO & Promotion"),
        ]
    )

    parent_page_types = ["authors.AuthorIndexPage"]
    subpage_types = []

    class Meta:
        verbose_name = "Author Page"

    # ── Properties ────────────────────────────────────────────────────────────
    @property
    def photo_url(self):
        if self.photo:
            try:
                return self.photo.get_rendition("fill-400x400").url
            except Exception:
                return None
        return None

    @property
    def photo_url_large(self):
        if self.photo:
            try:
                return self.photo.get_rendition("fill-800x800").url
            except Exception:
                return None
        return None

    @property
    def social_links(self):
        links = {}
        for field in ["twitter_url", "linkedin_url", "github_url", "website_url", "instagram_url", "youtube_url"]:
            value = getattr(self, field)
            if value:
                key = field.replace("_url", "")
                links[key] = value
        return links

    @property
    def featured_posts(self):
        """Return the 6 most recent live posts by this author."""
        from apps.blog.models import BlogPage
        return BlogPage.objects.live().filter(author=self).order_by("-published_date")[:6]
