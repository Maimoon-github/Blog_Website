# apps/core/mixins.py
"""
Reusable view/serializer mixins.
"""
from django.core.cache import cache
from django.utils.functional import cached_property


class CachedQuerysetMixin:
    """
    Mixin for DRF viewsets that caches queryset results.
    Override `cache_timeout` (seconds) and `cache_key_prefix` on the viewset.
    """

    cache_timeout = 60 * 10  # 10 minutes
    cache_key_prefix = "viewset"

    def get_cache_key(self, request):
        return f"{self.cache_key_prefix}:{request.path}:{request.query_params.urlencode()}"

    def list(self, request, *args, **kwargs):
        key = self.get_cache_key(request)
        cached = cache.get(key)
        if cached is not None:
            from rest_framework.response import Response
            return Response(cached)
        response = super().list(request, *args, **kwargs)
        cache.set(key, response.data, self.cache_timeout)
        return response


class SlugLookupMixin:
    """Allows DRF viewsets to accept `slug` in addition to `pk` lookups."""

    lookup_field = "slug"
    lookup_url_kwarg = "slug"