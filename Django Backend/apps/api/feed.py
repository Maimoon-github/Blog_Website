# apps/api/feed.py
"""
RSS and JSON Feed generation.
Endpoint: GET /api/v1/feed/
Supports: ?format=rss (default) | ?format=json | ?format=atom
"""
import logging
from datetime import timezone as dt_timezone

from django.conf import settings
from django.http import HttpResponse
from django.utils import timezone
from feedgen.feed import FeedGenerator
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

logger = logging.getLogger(__name__)


def _build_generator(request) -> FeedGenerator:
    """Shared setup for all feed formats."""
    from apps.blog.models import BlogPage

    base_url = getattr(settings, "NEXTJS_SERVER_URL", request.build_absolute_uri("/").rstrip("/"))
    site_name = getattr(settings, "WAGTAIL_SITE_NAME", "Blog")

    fg = FeedGenerator()
    fg.id(f"{base_url}/blog")
    fg.title(site_name)
    fg.link(href=f"{base_url}/blog", rel="alternate")
    fg.link(href=request.build_absolute_uri("/api/v1/feed/"), rel="self")
    fg.subtitle(f"Latest posts from {site_name}")
    fg.language("en")

    posts = (
        BlogPage.objects.live()
        .public()
        .select_related("author", "cover_image")
        .prefetch_related("categories", "tags")
        .order_by("-published_date")[:50]
    )

    for post in posts:
        fe = fg.add_entry(order="append")
        post_url = f"{base_url}/blog/{post.slug}"
        fe.id(post_url)
        fe.title(post.title)
        fe.link(href=post_url)
        fe.summary(post.excerpt or "")

        pub_date = post.published_date
        if pub_date and pub_date.tzinfo is None:
            pub_date = pub_date.replace(tzinfo=dt_timezone.utc)
        fe.published(pub_date)
        fe.updated(pub_date)

        if post.author:
            fe.author({"name": post.author.title, "email": ""})

        for cat in post.categories.all():
            fe.category({"term": cat.slug, "label": cat.name})

        if post.cover_image_url:
            fe.enclosure(post.cover_image_url, 0, "image/jpeg")

    return fg


class FeedView(APIView):
    """
    GET /api/v1/feed/?format=rss   → RSS 2.0
    GET /api/v1/feed/?format=atom  → Atom
    GET /api/v1/feed/?format=json  → JSON Feed 1.0
    """

    permission_classes = [AllowAny]
    authentication_classes = []

    def get(self, request, *args, **kwargs):
        fmt = request.query_params.get("format", "rss").lower()

        try:
            fg = _build_generator(request)
        except Exception as exc:
            logger.exception("Feed generation failed: %s", exc)
            return HttpResponse("Feed generation error.", status=500, content_type="text/plain")

        if fmt == "atom":
            content = fg.atom_str(pretty=True)
            return HttpResponse(content, content_type="application/atom+xml; charset=utf-8")
        elif fmt == "json":
            return self._json_feed(request)
        else:
            content = fg.rss_str(pretty=True)
            return HttpResponse(content, content_type="application/rss+xml; charset=utf-8")

    def _json_feed(self, request):
        """Emit a JSON Feed 1.1 document."""
        import json
        from apps.blog.models import BlogPage

        base_url = getattr(settings, "NEXTJS_SERVER_URL", request.build_absolute_uri("/").rstrip("/"))
        site_name = getattr(settings, "WAGTAIL_SITE_NAME", "Blog")

        posts = (
            BlogPage.objects.live()
            .public()
            .select_related("author", "cover_image")
            .prefetch_related("categories", "tags")
            .order_by("-published_date")[:50]
        )

        items = []
        for post in posts:
            post_url = f"{base_url}/blog/{post.slug}"
            item = {
                "id": post_url,
                "url": post_url,
                "title": post.title,
                "summary": post.excerpt or "",
                "date_published": post.published_date.isoformat() if post.published_date else None,
                "tags": list(post.tags.values_list("name", flat=True)),
            }
            if post.author:
                item["authors"] = [{"name": post.author.title}]
            if post.cover_image_url:
                item["image"] = post.cover_image_url
            items.append(item)

        feed = {
            "version": "https://jsonfeed.org/version/1.1",
            "title": site_name,
            "home_page_url": base_url,
            "feed_url": request.build_absolute_uri("/api/v1/feed/?format=json"),
            "items": items,
        }

        return HttpResponse(
            json.dumps(feed, indent=2, ensure_ascii=False),
            content_type="application/feed+json; charset=utf-8",
        )