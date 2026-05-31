"""
Shared utility functions.
"""
import math
import re

from django.utils.text import slugify


def calculate_reading_time(text: str, words_per_minute: int = 200) -> int:
    """Return estimated reading time in minutes (minimum 1)."""
    word_count = len(text.split())
    minutes = math.ceil(word_count / words_per_minute)
    return max(1, minutes)


def extract_text_from_streamfield(stream_data) -> str:
    """
    Recursively extract plain text from Wagtail StreamField data
    (used for reading-time calculation and search indexing).
    """
    text_parts = []

    def _recurse(obj):
        if isinstance(obj, str):
            # Strip HTML tags
            clean = re.sub(r"<[^>]+>", " ", obj)
            text_parts.append(clean)
        elif isinstance(obj, dict):
            for value in obj.values():
                _recurse(value)
        elif isinstance(obj, list):
            for item in obj:
                _recurse(item)

    _recurse(stream_data)
    return " ".join(text_parts)


def get_image_rendition_url(image, spec: str) -> str | None:
    """Safely return a rendition URL, returning None if image is falsy."""
    if not image:
        return None
    try:
        return image.get_rendition(spec).url
    except Exception:
        return None


def build_absolute_url(request, path: str) -> str:
    """Build absolute URL from a path using the current request."""
    return request.build_absolute_uri(path)


def clean_slug(value: str) -> str:
    """Return a URL-safe slug from any string."""
    return slugify(value)
