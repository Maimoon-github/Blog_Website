"""
Celery tasks for background revalidation and other async work.
"""
import logging

from celery import shared_task

logger = logging.getLogger(__name__)


@shared_task(bind=True, max_retries=3, default_retry_delay=5)
def revalidate_nextjs_page(self, paths: list[str]):
    """
    Async task: send revalidation request to Next.js for a list of paths.
    Called from blog signals after page publish/unpublish.
    """
    import requests
    from django.conf import settings

    nextjs_url = getattr(settings, "NEXTJS_SERVER_URL", "http://localhost:3000")
    secret = getattr(settings, "REVALIDATION_SECRET", "")

    for path in paths:
        try:
            resp = requests.post(
                f"{nextjs_url}/api/revalidate",
                json={"secret": secret, "path": path},
                timeout=10,
            )
            if not resp.ok:
                logger.warning("Revalidation returned %d for %s", resp.status_code, path)
        except requests.exceptions.RequestException as exc:
            logger.error("Revalidation failed for %s: %s", path, exc)
            try:
                raise self.retry(exc=exc)
            except self.MaxRetriesExceededError:
                logger.error("Max retries exceeded for path: %s", path)
