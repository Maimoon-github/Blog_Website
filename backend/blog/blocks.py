from wagtail import blocks
from wagtail.images.blocks import ImageChooserBlock
from wagtail.embeds.blocks import EmbedBlock


class CodeBlock(blocks.StructBlock):
    language = blocks.CharBlock(required=False, help_text="Programming language")
    code = blocks.TextBlock()

    class Meta:
        icon = "code"
        template = "blocks/code.html"  # not used in headless, kept for convention


class QuoteBlock(blocks.StructBlock):
    text = blocks.RichTextBlock()
    attribution = blocks.CharBlock(required=False)

    class Meta:
        icon = "openquote"
        template = "blocks/quote.html"