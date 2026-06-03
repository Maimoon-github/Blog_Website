# apps/common/utils.py
from wagtail.rich_text import RichText
import re

def extract_text_from_streamfield(streamfield_value):
    """Extract plain text from a custom StreamField-like structure."""
    text = ''
    if not streamfield_value:
        return ''
    for block in streamfield_value:
        if isinstance(block, dict):
            block_value = block.get('value', '')
            if isinstance(block_value, str):
                plain = re.sub(r'<[^>]+>', '', block_value)
                text += plain + ' '
            else:
                text += str(block_value) + ' '
    return text.strip()

def calculate_reading_time(text, words_per_minute=200):
    """Calculate reading time in minutes."""
    if not text:
        return 1
    word_count = len(text.split())
    minutes = round(word_count / words_per_minute)
    return max(1, minutes)

def get_image_rendition_url(image, filter_spec):
    """Safely get a rendition URL for a Wagtail image."""
    if not image:
        return None
    try:
        return image.get_rendition(filter_spec).url
    except Exception:
        try:
            return image.file.url
        except Exception:
            return None