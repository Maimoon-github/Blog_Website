# apps/common/serializers.py
from rest_framework import serializers
from apps.common.utils import get_image_rendition_url, build_absolute_url

class HeadlessImageSerializer(serializers.Serializer):
    """
    Transforms Wagtail Image objects into a multi-tier rendition JSON node
    tailored for mobile applications or Next.js responsive viewports.
    """
    id = serializers.IntegerField()
    title = serializers.CharField()
    desktop_url = serializers.SerializerMethodField()
    thumbnail_url = serializers.SerializerMethodField()

    def get_desktop_url(self, obj):
        request = self.context.get('request')
        relative_url = get_image_rendition_url(obj, 'fill-1200x630|jpegquality-85')
        return build_absolute_url(request, relative_url) if relative_url else None

    def get_thumbnail_url(self, obj):
        request = self.context.get('request')
        relative_url = get_image_rendition_url(obj, 'fill-150x150')
        return build_absolute_url(request, relative_url) if relative_url else None