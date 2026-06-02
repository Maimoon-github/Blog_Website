# apps/common/models.py
from django.db import models
from wagtail.models import Page
from wagtail.fields import StreamField
from wagtail.api import APIField

from apps.common.blocks import PAGE_BODY_BLOCKS
from apps.common.utils import extract_text_from_streamfield, calculate_reading_time

class GeneralFlexPage(Page):
    """
    A polymorphic content canvas used across generic platform spaces,
    serializing page models cleanly over headless APIs.
    """
    body = StreamField(PAGE_BODY_BLOCKS, use_json_field=True, blank=True)

    estimated_reading_minutes = models.IntegerField(editable=False, default=1)

    def save(self, *args, **kwargs):
        raw_text = extract_text_from_streamfield(self.body)
        self.estimated_reading_minutes = calculate_reading_time(raw_text)
        super().save(*args, **kwargs)

    content_panels = Page.content_panels + [
        # Standard administrative structural configurations would go here
    ]

    api_fields = [
        APIField('body'),
        APIField('estimated_reading_minutes'),
    ]