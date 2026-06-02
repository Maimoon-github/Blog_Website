# apps/taxonomy/serializers.py
from rest_framework import serializers

from .models import Category, Tag


class CategorySerializer(serializers.ModelSerializer):
    post_count = serializers.ReadOnlyField()
    cover_image_url = serializers.ReadOnlyField()

    class Meta:
        model = Category
        fields = [
            "id",
            "name",
            "slug",
            "description",
            "cover_image_url",
            "color",
            "order",
            "post_count",
            "seo_title",
            "seo_description",
        ]


class TagSerializer(serializers.ModelSerializer):
    post_count = serializers.ReadOnlyField()

    class Meta:
        model = Tag
        fields = [
            "id",
            "name",
            "slug",
            "description",
            "post_count",
            "seo_title",
            "seo_description",
        ]


class CategoryMinimalSerializer(serializers.ModelSerializer):
    """Lightweight serializer for embedding in blog post responses."""

    class Meta:
        model = Category
        fields = ["id", "name", "slug", "color"]


class TagMinimalSerializer(serializers.ModelSerializer):
    """Lightweight serializer for embedding in blog post responses."""

    class Meta:
        model = Tag
        fields = ["id", "name", "slug"]