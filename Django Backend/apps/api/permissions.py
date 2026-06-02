# apps/api/permissions.py
"""
Custom DRF permission classes.
"""
from django.conf import settings
from rest_framework.permissions import BasePermission


class IsRevalidationToken(BasePermission):
    """
    Allow access only if the request includes the correct revalidation secret.
    Used for: POST /api/v1/revalidate/
    """

    def has_permission(self, request, view):
        token = (
            request.headers.get("X-Revalidation-Secret")
            or request.query_params.get("secret")
            or request.data.get("secret")
        )
        expected = getattr(settings, "REVALIDATION_SECRET", "")
        return bool(expected and token == expected)


class IsAdminOrReadOnly(BasePermission):
    """
    Read-only for everyone; write only for Wagtail admins.
    """

    def has_permission(self, request, view):
        if request.method in ("GET", "HEAD", "OPTIONS"):
            return True
        return request.user and request.user.is_staff