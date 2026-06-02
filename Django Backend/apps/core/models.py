# apps/core/models.py
"""
Abstract base models shared across the project.
"""
from django.db import models
from django.utils import timezone


class TimeStampedModel(models.Model):
    """Abstract mixin providing created_at / updated_at fields."""

    created_at = models.DateTimeField(default=timezone.now, editable=False, db_index=True)
    updated_at = models.DateTimeField(auto_now=True, db_index=True)

    class Meta:
        abstract = True
        ordering = ["-created_at"]


class PublishableModel(TimeStampedModel):
    """Abstract mixin for content that can be published/unpublished."""

    is_published = models.BooleanField(default=False, db_index=True)
    published_at = models.DateTimeField(null=True, blank=True, db_index=True)

    def publish(self):
        self.is_published = True
        self.published_at = timezone.now()
        self.save(update_fields=["is_published", "published_at"])

    def unpublish(self):
        self.is_published = False
        self.save(update_fields=["is_published"])

    class Meta:
        abstract = True