# apps/authors/serializers.py
from rest_framework import serializers

from apps.seo.serializers import SEOSerializer

from .models import AuthorIndexPage, AuthorPage

class AuthorMinimalSerializer(serializers.ModelSerializer):
    photo_url = serializers.ReadOnlyField()
    social_links = serializers.ReadOnlyField()

    class Meta:
        model = AuthorPage
        fields = ["id", "title", "slug", "role", "short_bio", "photo_url", "social_links"]

class AuthorSerializer(serializers.ModelSerializer):
    photo_url = serializers.ReadOnlyField()
    photo_url_large = serializers.ReadOnlyField()
    social_links = serializers.ReadOnlyField()
    seo = serializers.SerializerMethodField()
    post_count = serializers.SerializerMethodField()
    featured_posts = serializers.SerializerMethodField()

    class Meta:
        model = AuthorPage
        fields = [
            "id",
            "title",
            "slug",
            "role",
            "bio",
            "short_bio",
            "photo_url",
            "photo_url_large",
            "social_links",
            "seo",
            "post_count",
            "featured_posts",
        ]

    def get_seo(self, obj):
        return SEOSerializer(obj).data

    def get_post_count(self, obj):
        from apps.blog.models import BlogPage
        return BlogPage.objects.live().filter(author=obj).count()

    def get_featured_posts(self, obj):
        from apps.blog.serializers import BlogPostMinimalSerializer
        return BlogPostMinimalSerializer(obj.featured_posts, many=True).data