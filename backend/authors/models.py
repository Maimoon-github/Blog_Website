from django.db import models
from wagtail.snippets.models import register_snippet
from wagtail.admin.panels import FieldPanel
from wagtail.fields import RichTextField

@register_snippet
class Author(models.Model):
    name = models.CharField(max_length=255)
    bio = RichTextField(blank=True)
    image = models.ForeignKey(
        "images.CustomImage",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+"
    )
    twitter_handle = models.CharField(max_length=100, blank=True)
    website = models.URLField(blank=True)

    panels = [
        FieldPanel("name"),
        FieldPanel("bio"),
        FieldPanel("image"),
        FieldPanel("twitter_handle"),
        FieldPanel("website"),
    ]

    def __str__(self):
        return self.name
