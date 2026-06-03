# apps/blog/serializers.py
"""
Blog serializers.
"""
from rest_framework import serializers
from wagtail.rich_text import expand_db_html

from apps.authors.serializers import AuthorMinimalSerializer
from apps.seo.serializers import SEOSerializer
from apps.taxonomy.serializers import CategoryMinimalSerializer, TagMinimalSerializer

from .models import BlogIndexPage, BlogPage


class BlogPostMinimalSerializer(serializers.ModelSerializer):
    """
    Compact representation used in:
      - Listing pages
      - Author featured posts
      - Related content
    """

    cover_image_url = serializers.ReadOnlyField()
    cover_image_url_small = serializers.ReadOnlyField()
    author = AuthorMinimalSerializer(read_only=True)
    categories = CategoryMinimalSerializer(many=True, read_only=True)
    tag_names = serializers.ReadOnlyField()

    class Meta:
        model = BlogPage
        fields = [
            "id",
            "title",
            "slug",
            "excerpt",
            "cover_image_url",
            "cover_image_url_small",
            "published_date",
            "updated_date",
            "reading_time",
            "is_featured",
            "author",
            "categories",
            "tag_names",
        ]


class BlogPostDetailSerializer(serializers.ModelSerializer):
    """
    Full blog post detail – used for /api/v1/blog/[slug]/.
    Includes all body StreamField data as JSON.
    """

    cover_image_url = serializers.ReadOnlyField()
    featured_image_url = serializers.ReadOnlyField()
    og_image_url = serializers.ReadOnlyField()
    author = AuthorMinimalSerializer(read_only=True)
    categories = CategoryMinimalSerializer(many=True, read_only=True)
    tag_names = serializers.ReadOnlyField()
    seo = serializers.SerializerMethodField()
    body = serializers.SerializerMethodField()

    class Meta:
        model = BlogPage
        fields = [
            "id",
            "title",
            "slug",
            "excerpt",
            "body",
            "cover_image_url",
            "featured_image_url",
            "og_image_url",
            "published_date",
            "updated_date",
            "reading_time",
            "is_featured",
            "author",
            "categories",
            "tag_names",
            "seo",
        ]

    def get_seo(self, obj):
        return SEOSerializer(obj).data

    def get_body(self, obj):
        """
        Return StreamField body as a list of typed blocks.
        Each block: { type: string, value: any, id: string }
        Next.js can switch on `type` to render the correct component.
        """
        blocks = []
        for block in obj.body:
            block_data = {"type": block.block_type, "id": str(block.id) if block.id else None}
            
            # Extract value for processing
            val = block.value
            
            # Handle ParagraphBlock (StructBlock with 'text' field)
            if block.block_type == "paragraph" and hasattr(val, "__getitem__") and "text" in val:
                val = val["text"]

            # Rich text blocks need HTML expansion
            if block.block_type in ("rich_text", "paragraph") or hasattr(val, "source"):
                try:
                    raw = val.source if hasattr(val, "source") else str(val)
                    block_data["value"] = expand_db_html(raw)
                except Exception:
                    block_data["value"] = str(val)
            else:
                block_data["value"] = val
            
            blocks.append(block_data)
        return blocks