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







#---------------------------------------------










# apps/api/tasks.py
import logging
import requests
from django.conf import settings
from celery import shared_task

logger = logging.getLogger(__name__)

@shared_task(
    autoretry_for=(requests.RequestException,),
    retry_backoff=True,
    max_retries=5,
    name="apps.api.tasks.revalidate_nextjs_page"
)
def revalidate_nextjs_page(paths):
    """
    Dispatches a secure webhook request to the frontend application
    to clear cache boundaries for targeted static URL routes.
    """
    if not paths:
        return "No paths provided for revalidation."

    frontend_url = getattr(settings, "NEXTJS_FRONTEND_URL", "http://localhost:3000")
    webhook_endpoint = f"{frontend_url}/api/revalidate"
    webhook_secret = getattr(settings, "NEXTJS_REVALIDATION_SECRET", None)

    if not webhook_secret:
        logger.error("ISR Synchronization cancelled: NEXTJS_REVALIDATION_SECRET is undefined.")
        return "Secret missing."

    payload = {"paths": paths}
    headers = {
        "Authorization": f"Bearer {webhook_secret}",
        "Content-Type": "application/json",
    }

    try:
        response = requests.post(webhook_endpoint, json=payload, headers=headers, timeout=10)
        response.raise_for_status()
        logger.info("Successfully synchronized frontend paths: %s", paths)
        return f"Revalidated paths: {paths}"
    except requests.RequestException as exc:
        logger.error("Frontend revalidation sync failure on endpoint %s: %s", webhook_endpoint, exc)
        raise exc