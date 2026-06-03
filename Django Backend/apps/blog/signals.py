# apps/blog/signals.py
"""
Signals for BlogPage – triggers Next.js ISR revalidation on publish.
"""
import logging

from wagtail.signals import page_published, page_unpublished

logger = logging.getLogger(__name__)


def trigger_revalidation(sender, **kwargs):
    """
    Fire a revalidation request to Next.js whenever a BlogPage is published.
    Uses Celery task so it doesn't block the Wagtail save.
    """
    from apps.blog.models import BlogPage

    instance = kwargs.get("instance")
    if not isinstance(instance, BlogPage):
        return

    try:
        from apps.api.tasks import revalidate_nextjs_page
        revalidate_nextjs_page.delay(
            paths=[
                f"/blog/{instance.slug}",
                "/blog",
                "/",
            ]
        )
    except Exception as exc:
        logger.warning("Could not queue revalidation task: %s", exc)


page_published.connect(trigger_revalidation)
page_unpublished.connect(trigger_revalidation)