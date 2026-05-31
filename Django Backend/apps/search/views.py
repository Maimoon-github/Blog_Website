"""
Search API views.

GET /api/v1/search/?q=<query>&type=<all|blog|pages|authors>&page=1&page_size=10

Response shape:
{
  "query": "...",
  "total": 42,
  "pagination": { ... },
  "results": [
    {
      "type": "blog",
      "id": 1,
      "title": "...",
      "slug": "...",
      "excerpt": "...",
      "url": "/blog/my-post",
      "published_date": "...",
      "cover_image_url": "...",
      "author": { ... }
    },
    ...
  ],
  "suggestions": []  # future: search-as-you-type suggestions
}
"""
import logging

from django.core.cache import cache
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from wagtail.search.backends import get_search_backend

from apps.api.pagination import StandardResultsPagination

logger = logging.getLogger(__name__)


class SearchView(APIView):
    """
    Full-text search using Wagtail's search backend (PostgreSQL or Elasticsearch).
    """

    permission_classes = [AllowAny]
    pagination_class = StandardResultsPagination

    # Maximum number of raw search results before pagination
    MAX_RESULTS = 200

    def get(self, request, *args, **kwargs):
        query = request.query_params.get("q", "").strip()
        content_type = request.query_params.get("type", "all").lower()

        if not query:
            return Response(
                {
                    "query": "",
                    "total": 0,
                    "results": [],
                    "suggestions": [],
                    "pagination": None,
                }
            )

        # Cache: short TTL (2 minutes) to reduce DB load for repeated searches
        cache_key = f"search:{content_type}:{query[:200]}"
        cached = cache.get(cache_key)
        if cached:
            return self._paginate(request, query, cached)

        results = self._run_search(query, content_type)
        cache.set(cache_key, results, 60 * 2)
        return self._paginate(request, query, results)

    def _run_search(self, query: str, content_type: str) -> list:
        """Execute Wagtail search and return serialized result list."""
        backend = get_search_backend()
        results = []

        from apps.blog.models import BlogPage
        from apps.pages.models import AboutPage, ContactPage, HomePage, ServicesPage
        from apps.authors.models import AuthorPage

        search_models = []
        if content_type in ("all", "blog"):
            search_models.append(("blog", BlogPage))
        if content_type in ("all", "pages"):
            search_models += [
                ("page", HomePage),
                ("page", AboutPage),
                ("page", ContactPage),
                ("page", ServicesPage),
            ]
        if content_type in ("all", "authors"):
            search_models.append(("author", AuthorPage))

        for result_type, model in search_models:
            try:
                qs = model.objects.live().public()
                hits = backend.search(query, qs)[:self.MAX_RESULTS]
                for hit in hits:
                    results.append(self._serialize_hit(result_type, hit))
            except Exception as exc:
                logger.warning("Search failed for %s: %s", model.__name__, exc)

        # Sort by relevance score (approximated by type priority) then title
        # A future enhancement: use backend scores if available
        return results

    def _serialize_hit(self, result_type: str, page) -> dict:
        """Convert a search hit to a Next.js-friendly dict."""
        item = {
            "type": result_type,
            "id": page.id,
            "title": page.title,
            "slug": page.slug,
            "excerpt": getattr(page, "excerpt", "") or getattr(page, "short_bio", "") or "",
        }

        if result_type == "blog":
            item["url"] = f"/blog/{page.slug}"
            item["published_date"] = (
                page.published_date.isoformat() if page.published_date else None
            )
            item["cover_image_url"] = getattr(page, "cover_image_url", None)
            if page.author:
                item["author"] = {
                    "title": page.author.title,
                    "slug": page.author.slug,
                    "photo_url": getattr(page.author, "photo_url", None),
                }
        elif result_type == "author":
            item["url"] = f"/authors/{page.slug}"
            item["photo_url"] = getattr(page, "photo_url", None)
            item["role"] = getattr(page, "role", "")
        else:
            item["url"] = f"/{page.slug}"

        return item

    def _paginate(self, request, query: str, results: list) -> Response:
        """Apply pagination to results list and return paginated response."""
        paginator = self.pagination_class()
        try:
            page_size = int(request.query_params.get("page_size", paginator.page_size))
            page_number = int(request.query_params.get("page", 1))
        except (ValueError, TypeError):
            page_size = paginator.page_size
            page_number = 1

        page_size = min(page_size, paginator.max_page_size)
        total = len(results)
        import math
        total_pages = max(1, math.ceil(total / page_size))
        page_number = min(page_number, total_pages)
        start = (page_number - 1) * page_size
        end = start + page_size
        page_results = results[start:end]

        return Response(
            {
                "query": query,
                "total": total,
                "pagination": {
                    "count": total,
                    "total_pages": total_pages,
                    "current_page": page_number,
                    "page_size": page_size,
                    "has_next": page_number < total_pages,
                    "has_previous": page_number > 1,
                },
                "results": page_results,
                "suggestions": [],  # Placeholder for search-as-you-type
            }
        )


class SearchSuggestionsView(APIView):
    """
    GET /api/v1/search/suggest/?q=<partial>
    Returns up to 5 title suggestions for autocomplete.
    """

    permission_classes = [AllowAny]

    def get(self, request):
        query = request.query_params.get("q", "").strip()
        if len(query) < 2:
            return Response({"suggestions": []})

        from apps.blog.models import BlogPage

        suggestions = (
            BlogPage.objects.live()
            .public()
            .filter(title__icontains=query)
            .values_list("title", "slug")[:5]
        )
        return Response(
            {
                "suggestions": [
                    {"title": title, "url": f"/blog/{slug}"}
                    for title, slug in suggestions
                ]
            }
        )
