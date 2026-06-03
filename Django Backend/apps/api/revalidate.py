# apps/api/revalidate.py
"""
Next.js ISR revalidation endpoint.

POST /api/v1/revalidate/
Headers: X-Revalidation-Secret: <token>
Body (JSON):
  { "paths": ["/blog/my-post", "/blog"], "type": "path" }
  OR
  { "tag": "blog-posts", "type": "tag" }
"""
import logging

import requests
from django.conf import settings
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .permissions import IsRevalidationToken

logger = logging.getLogger(__name__)


class RevalidateView(APIView):
    """
    Accepts a webhook from Wagtail (or any caller with the secret token)
    and forwards revalidation requests to Next.js.
    """

    permission_classes = [IsRevalidationToken]
    authentication_classes = []

    def post(self, request, *args, **kwargs):
        data = request.data
        revalidation_type = data.get("type", "path")

        nextjs_url = getattr(settings, "NEXTJS_SERVER_URL", "http://localhost:3000")
        secret = getattr(settings, "REVALIDATION_SECRET", "")

        results = []

        if revalidation_type == "tag":
            tag = data.get("tag")
            if not tag:
                return Response({"error": "'tag' is required for type=tag"}, status=400)
            result = self._call_nextjs_revalidate(nextjs_url, secret, tag=tag)
            results.append(result)

        else:
            paths = data.get("paths", [])
            if not isinstance(paths, list):
                paths = [paths]
            if not paths:
                return Response({"error": "'paths' must be a non-empty list"}, status=400)

            for path in paths:
                result = self._call_nextjs_revalidate(nextjs_url, secret, path=path)
                results.append(result)

        all_ok = all(r.get("ok") for r in results)
        return Response(
            {"revalidated": all_ok, "results": results},
            status=status.HTTP_200_OK if all_ok else status.HTTP_207_MULTI_STATUS,
        )

    def _call_nextjs_revalidate(self, nextjs_url: str, secret: str, path: str = None, tag: str = None) -> dict:
        """Call Next.js revalidation API route."""
        try:
            endpoint = f"{nextjs_url}/api/revalidate"
            payload = {"secret": secret}
            if path:
                payload["path"] = path
            if tag:
                payload["tag"] = tag

            resp = requests.post(
                endpoint,
                json=payload,
                timeout=10,
                headers={"Content-Type": "application/json"},
            )
            return {"ok": resp.ok, "path": path, "tag": tag, "status": resp.status_code}
        except requests.exceptions.RequestException as exc:
            logger.warning("Revalidation call failed for path=%s tag=%s: %s", path, tag, exc)
            return {"ok": False, "path": path, "tag": tag, "error": str(exc)}