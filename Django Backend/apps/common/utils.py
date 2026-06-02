# apps/common/utils.py
from wagtail.core.rich_text import RichText

def extract_text_from_streamfield(streamfield_value):
    """Extract plain text from a StreamField or RichText block."""
    text = ''
    for block in streamfield_value:
        if block.block_type == 'rich_text':
            text += RichText(block.value).source + ' '
        elif hasattr(block.value, 'source'):
            text += block.value.source + ' '
        else:
            text += str(block.value) + ' '
    return text.strip()

def calculate_reading_time(text, words_per_minute=200):
    """Calculate reading time in minutes based on word count."""
    word_count = len(text.split())
    minutes = round(word_count / words_per_minute)
    return max(1, minutes)  # at least 1 minute