from rest_framework import serializers
from .models import Author

class AuthorSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Author
        fields = ["id", "name", "bio", "image_url", "twitter_handle", "website"]

    def get_image_url(self, obj):
        if obj.image:
            return obj.image.get_rendition("fill-200x200").url
        return None
