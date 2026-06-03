# apps/core/managers.py
from django.db import models
from django.utils import timezone

class PublishedQuerySet(models.QuerySet):
    """Chainable custom queryset for handling publishable content layers."""

    def published(self):
        return self.filter(is_published=True, published_at__lte=timezone.now())

    def drafts(self):
        return self.filter(is_published=False)


class PublishedManager(models.Manager).from_queryset(PublishedQuerySet):
    """
    Standard base manager for Publishable Models.
    Usage in model: objects = PublishedManager()
    """
    pass