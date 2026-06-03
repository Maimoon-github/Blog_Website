# apps/taxonomy/views.py
from django.db.models import Count, OuterRef, Subquery
from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from apps.blog.models import BlogPage
from .models import Category, Tag
from .serializers import CategorySerializer, TagSerializer


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows categories to be viewed.
    Uses 'slug' as the lookup field instead of 'id'.
    """
    serializer_class = CategorySerializer
    lookup_field = "slug"
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Category.objects.select_related("cover_image").annotate(
            _annotated_post_count=Count("blog_posts", filter=Count("blog_posts__live", True))
        ).order_by("order", "name")


class TagViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows tags to be viewed.
    Uses 'slug' as the lookup field instead of 'id'.
    """
    serializer_class = TagSerializer
    lookup_field = "slug"
    permission_classes = [AllowAny]

    def get_queryset(self):
        # Subquery to count live blog posts associated with each tag
        post_count_subquery = Subquery(
            BlogPage.objects.live().filter(tags__name=OuterRef("name")).values("tags__name").annotate(
                cnt=Count("id")
            ).values("cnt")[:1]
        )
        return Tag.objects.annotate(
            _annotated_post_count=post_count_subquery
        ).order_by("name")