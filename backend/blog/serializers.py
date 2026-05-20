from rest_framework import serializers

from core.serializers import BasePageSerializer  # provides id, title, slug, seo...
from .models import BlogPage, BlogIndexPage


class BlogPageListSerializer(BasePageSerializer):
    hero_image_url = serializers.CharField(read_only=True)
    author_name = serializers.CharField(source="author.name", read_only=True, default=None)
    published_at = serializers.DateTimeField(source="first_published_at", read_only=True)
    reading_time_minutes = serializers.IntegerField(read_only=True)

    class Meta(BasePageSerializer.Meta):
        model = BlogPage
        fields = BasePageSerializer.Meta.fields + [
            "intro",
            "hero_image_url",
            "author_name",
            "published_at",
            "reading_time_minutes",
        ]


class BlogPageDetailSerializer(BasePageSerializer):
    hero_image_url = serializers.CharField(read_only=True)
    author = serializers.SerializerMethodField()
    categories = serializers.SerializerMethodField()
    tags = serializers.SerializerMethodField()
    body = serializers.SerializerMethodField()          # rendered blocks
    related_posts = serializers.SerializerMethodField()  # simple logical relation
    published_at = serializers.DateTimeField(source="first_published_at", read_only=True)
    reading_time_minutes = serializers.IntegerField(read_only=True)

    class Meta(BasePageSerializer.Meta):
        model = BlogPage
        fields = BasePageSerializer.Meta.fields + [
            "intro",
            "body",
            "hero_image_url",
            "author",
            "categories",
            "tags",
            "reading_time_minutes",
            "published_at",
            "related_posts",
        ]

    def get_author(self, obj):
        if obj.author:
            return {
                "id": obj.author.id,
                "name": obj.author.name,
                # include other author fields as needed
            }
        return None

    def get_categories(self, obj):
        return [{"id": c.id, "name": c.name, "slug": c.slug} for c in obj.categories.all()]

    def get_tags(self, obj):
        return [{"id": t.id, "name": t.name, "slug": t.slug} for t in obj.tags.all()]

    def get_body(self, obj):
        # Return streamfield blocks as a list of dicts with type and value
        return [
            {"type": block.block_type, "value": block.value}
            for block in obj.body
        ]

    def get_related_posts(self, obj):
        # Simple related posts: same categories, exclude self, live, max 3
        category_ids = obj.categories.values_list("id", flat=True)
        if not category_ids:
            return []
        related = BlogPage.objects.live() \
            .filter(categories__id__in=category_ids) \
            .exclude(pk=obj.pk) \
            .distinct() \
            .order_by("-first_published_at")[:3]
        return BlogPageListSerializer(related, many=True, context=self.context).data


class BlogIndexPageSerializer(serializers.Serializer):
    """Wraps a paginated list response with metadata."""
    count = serializers.IntegerField()
    next = serializers.URLField(allow_null=True)
    previous = serializers.URLField(allow_null=True)
    results = BlogPageListSerializer(many=True)