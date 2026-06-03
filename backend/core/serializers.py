from rest_framework import serializers

class BasePageSerializer(serializers.ModelSerializer):
    """
    Base serializer for all Wagtail pages.
    Provides common fields like id, title, slug, and SEO metadata.
    """
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(read_only=True)
    slug = serializers.SlugField(read_only=True)
    seo_display_title = serializers.CharField(source="seo_title_display", read_only=True)
    search_description = serializers.CharField(source="search_description_display", read_only=True)
    
    class Meta:
        model = None
        fields = [
            "id",
            "title",
            "slug",
            "seo_display_title",
            "search_description",
            "first_published_at",
            "last_published_at",
        ]
