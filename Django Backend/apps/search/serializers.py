# apps/search/serializers.py
"""
Search result serializers (used internally by SearchView).
Kept separate so they can be imported by tests independently.
"""
from rest_framework import serializers


class SearchResultSerializer(serializers.Serializer):
    type = serializers.CharField()
    id = serializers.IntegerField()
    title = serializers.CharField()
    slug = serializers.CharField()
    url = serializers.CharField()
    excerpt = serializers.CharField(allow_blank=True)
    published_date = serializers.DateTimeField(required=False, allow_null=True)
    cover_image_url = serializers.URLField(required=False, allow_null=True)
    photo_url = serializers.URLField(required=False, allow_null=True)
    role = serializers.CharField(required=False, allow_blank=True)
    author = serializers.DictField(required=False, allow_null=True)