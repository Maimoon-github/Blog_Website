# apps/api/tasks.py
"""
Celery tasks for background revalidation and other async work.
"""
import logging

from celery import shared_task
import requests
from django.conf import settings

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