from django.db import models
from wagtail.models import Page
from wagtail.admin.panels import FieldPanel, MultiFieldPanel
from wagtail.search import index

class AbstractBasePage(Page):
    """
    Abstract base page for all pages in the project.
    Includes common SEO and metadata fields.
    """
    seo_title_custom = models.CharField(
        max_length=255,
        blank=True,
        help_text="Override the default SEO title."
    )
    search_description_custom = models.TextField(
        blank=True,
        help_text="Override the default search description."
    )

    promo_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
        help_text="Image used for social media sharing and promo cards."
    )

    promote_panels = [
        MultiFieldPanel([
            FieldPanel("seo_title_custom"),
            FieldPanel("search_description_custom"),
            FieldPanel("promo_image"),
        ], "SEO & Social Media Overrides"),
    ]

    class Meta:
        abstract = True

    @property
    def seo_title_display(self):
        return self.seo_title_custom or self.seo_title or self.title

    @property
    def search_description_display(self):
        return self.search_description_custom or self.search_description or ""
