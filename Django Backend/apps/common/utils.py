# apps/common/utils.py
from wagtail.core.rich_text import RichText

# apps/common/utils.py

def extract_text_from_streamfield(streamfield_value):
    """Extract plain text from a custom StreamField-like structure."""
    text = ''
    for block in streamfield_value:
        if isinstance(block, dict):
            block_type = block.get('type', '')
            block_value = block.get('value', '')
            if block_type == 'rich_text' and isinstance(block_value, str):
                # Remove HTML tags if present
                import re
                plain = re.sub(r'<[^>]+>', '', block_value)
                text += plain + ' '
            else:
                text += str(block_value) + ' '
        else:
            text += str(block) + ' '
    return text.strip()

def calculate_reading_time(text, words_per_minute=200):
    """Calculate reading time in minutes."""
    word_count = len(text.split())
    minutes = round(word_count / words_per_minute)
    return max(1, minutes)