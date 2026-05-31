"""
All reusable StreamField blocks for the blog CMS.

These blocks are used across BlogPage, HomePage, ServicesPage, etc.
Every block serialises cleanly to JSON for Next.js consumption.
"""
from django import forms
from wagtail import blocks
from wagtail.embeds.blocks import EmbedBlock
from wagtail.images.blocks import ImageChooserBlock


# ─────────────────────────────────────────────────────────────────────────────
# Primitive / Typography blocks
# ─────────────────────────────────────────────────────────────────────────────

class HeadingBlock(blocks.StructBlock):
    """H2–H4 heading with optional anchor ID."""

    text = blocks.CharBlock(required=True)
    level = blocks.ChoiceBlock(
        choices=[("h2", "H2"), ("h3", "H3"), ("h4", "H4"), ("h5", "H5")],
        default="h2",
    )
    anchor_id = blocks.CharBlock(
        required=False,
        help_text="Optional anchor slug for deep-linking (auto-generated if blank)",
    )

    class Meta:
        icon = "title"
        label = "Heading"
        template = None  # headless – no template needed


class ParagraphBlock(blocks.StructBlock):
    """Rich text paragraph block."""

    text = blocks.RichTextBlock(
        features=["bold", "italic", "link", "ol", "ul", "hr", "superscript", "subscript"]
    )

    class Meta:
        icon = "pilcrow"
        label = "Paragraph"


class RichTextBlock(blocks.RichTextBlock):
    """Full-featured rich text (for body copy)."""

    class Meta:
        icon = "doc-full"
        label = "Rich Text"
        features = [
            "h2", "h3", "h4", "bold", "italic", "underline", "strikethrough",
            "ol", "ul", "hr", "link", "document-link", "image",
            "embed", "code", "superscript", "subscript", "blockquote",
        ]


class QuoteBlock(blocks.StructBlock):
    """Pull-quote block."""

    quote = blocks.TextBlock(required=True)
    attribution = blocks.CharBlock(required=False, label="Author / source")
    attribution_url = blocks.URLBlock(required=False, label="Source URL")

    class Meta:
        icon = "openquote"
        label = "Quote"


class CodeBlock(blocks.StructBlock):
    """Syntax-highlighted code block."""

    language = blocks.ChoiceBlock(
        choices=[
            ("python", "Python"),
            ("javascript", "JavaScript"),
            ("typescript", "TypeScript"),
            ("jsx", "JSX / TSX"),
            ("html", "HTML"),
            ("css", "CSS"),
            ("bash", "Bash / Shell"),
            ("json", "JSON"),
            ("yaml", "YAML"),
            ("sql", "SQL"),
            ("go", "Go"),
            ("rust", "Rust"),
            ("plaintext", "Plain text"),
        ],
        default="python",
    )
    filename = blocks.CharBlock(required=False, help_text="Optional filename label")
    code = blocks.TextBlock()

    class Meta:
        icon = "code"
        label = "Code Block"


class MarkdownBlock(blocks.TextBlock):
    """Raw Markdown – rendered client-side by Next.js."""

    class Meta:
        icon = "doc-full-inverse"
        label = "Markdown"


# ─────────────────────────────────────────────────────────────────────────────
# Media blocks
# ─────────────────────────────────────────────────────────────────────────────

class ImageBlock(blocks.StructBlock):
    """Responsive image with caption + alt text."""

    image = ImageChooserBlock(required=True)
    alt_text = blocks.CharBlock(required=False, help_text="Overrides the image title for alt text")
    caption = blocks.RichTextBlock(
        required=False,
        features=["bold", "italic", "link"],
    )
    alignment = blocks.ChoiceBlock(
        choices=[("left", "Left"), ("center", "Center"), ("right", "Right"), ("full", "Full width")],
        default="full",
    )

    class Meta:
        icon = "image"
        label = "Image"


class GalleryBlock(blocks.StructBlock):
    """Image gallery grid."""

    title = blocks.CharBlock(required=False)
    images = blocks.ListBlock(ImageChooserBlock())
    columns = blocks.ChoiceBlock(
        choices=[("2", "2 columns"), ("3", "3 columns"), ("4", "4 columns")],
        default="3",
    )

    class Meta:
        icon = "images"
        label = "Gallery"


class VideoEmbedBlock(EmbedBlock):
    """General embed (YouTube, Vimeo, Twitter, etc.)."""

    class Meta:
        icon = "media"
        label = "Embed"


class YouTubeBlock(blocks.StructBlock):
    """Dedicated YouTube embed with extra controls."""

    video_id = blocks.CharBlock(
        required=True,
        help_text="The YouTube video ID (e.g. dQw4w9WgXcQ)",
    )
    title = blocks.CharBlock(required=False)
    start_time = blocks.IntegerBlock(required=False, default=0, help_text="Start time in seconds")
    autoplay = blocks.BooleanBlock(required=False, default=False)
    show_controls = blocks.BooleanBlock(required=False, default=True)

    class Meta:
        icon = "media"
        label = "YouTube Video"


# ─────────────────────────────────────────────────────────────────────────────
# Interactive / UI blocks
# ─────────────────────────────────────────────────────────────────────────────

class ButtonBlock(blocks.StructBlock):
    """Single CTA button."""

    label = blocks.CharBlock(required=True)
    url = blocks.URLBlock(required=False)
    page = blocks.PageChooserBlock(required=False)
    style = blocks.ChoiceBlock(
        choices=[("primary", "Primary"), ("secondary", "Secondary"), ("outline", "Outline"), ("ghost", "Ghost")],
        default="primary",
    )
    open_in_new_tab = blocks.BooleanBlock(required=False, default=False)

    class Meta:
        icon = "link"
        label = "Button"


class CTABlock(blocks.StructBlock):
    """Call-to-action section with heading, body, and buttons."""

    heading = blocks.CharBlock(required=True)
    subheading = blocks.TextBlock(required=False)
    body = blocks.RichTextBlock(required=False, features=["bold", "italic", "link"])
    buttons = blocks.ListBlock(ButtonBlock())
    background = blocks.ChoiceBlock(
        choices=[("white", "White"), ("light", "Light grey"), ("dark", "Dark"), ("brand", "Brand colour")],
        default="white",
    )

    class Meta:
        icon = "pick"
        label = "Call to Action"


class FAQItemBlock(blocks.StructBlock):
    question = blocks.CharBlock(required=True)
    answer = blocks.RichTextBlock(features=["bold", "italic", "link", "ol", "ul"])

    class Meta:
        icon = "help"
        label = "FAQ Item"


class FAQBlock(blocks.StructBlock):
    """Accordion-style FAQ section with JSON-LD schema support."""

    title = blocks.CharBlock(required=False, default="Frequently Asked Questions")
    items = blocks.ListBlock(FAQItemBlock())

    class Meta:
        icon = "list-ul"
        label = "FAQ Section"


class StatisticItemBlock(blocks.StructBlock):
    label = blocks.CharBlock(required=True)
    value = blocks.CharBlock(required=True, help_text="e.g. '10,000+' or '99%'")
    description = blocks.TextBlock(required=False)

    class Meta:
        icon = "order"
        label = "Statistic"


class StatisticsBlock(blocks.StructBlock):
    """Grid of stats / numbers."""

    title = blocks.CharBlock(required=False)
    stats = blocks.ListBlock(StatisticItemBlock())

    class Meta:
        icon = "order"
        label = "Statistics"


class FeatureItemBlock(blocks.StructBlock):
    icon_name = blocks.CharBlock(required=False, help_text="Icon name (e.g. Heroicons slug)")
    title = blocks.CharBlock(required=True)
    description = blocks.TextBlock(required=False)
    link = blocks.URLBlock(required=False)

    class Meta:
        icon = "tick-inverse"
        label = "Feature"


class FeatureBlock(blocks.StructBlock):
    """Feature grid or list."""

    title = blocks.CharBlock(required=False)
    subtitle = blocks.TextBlock(required=False)
    features = blocks.ListBlock(FeatureItemBlock())
    layout = blocks.ChoiceBlock(
        choices=[("grid", "Grid"), ("list", "List"), ("alternating", "Alternating")],
        default="grid",
    )

    class Meta:
        icon = "list-ul"
        label = "Features"


# ─────────────────────────────────────────────────────────────────────────────
# Section / Layout blocks
# ─────────────────────────────────────────────────────────────────────────────

class HeroBlock(blocks.StructBlock):
    """Full-width hero section for pages."""

    heading = blocks.CharBlock(required=True)
    subheading = blocks.TextBlock(required=False)
    body = blocks.RichTextBlock(required=False, features=["bold", "italic", "link"])
    image = ImageChooserBlock(required=False)
    image_alt = blocks.CharBlock(required=False)
    buttons = blocks.ListBlock(ButtonBlock())
    layout = blocks.ChoiceBlock(
        choices=[("centered", "Centered"), ("left", "Left-aligned"), ("split", "Split (text + image)")],
        default="centered",
    )
    background = blocks.ChoiceBlock(
        choices=[("white", "White"), ("light", "Light"), ("dark", "Dark"), ("gradient", "Gradient")],
        default="white",
    )

    class Meta:
        icon = "image"
        label = "Hero Section"


class TestimonialItemBlock(blocks.StructBlock):
    quote = blocks.TextBlock(required=True)
    author_name = blocks.CharBlock(required=True)
    author_title = blocks.CharBlock(required=False)
    author_image = ImageChooserBlock(required=False)
    rating = blocks.IntegerBlock(required=False, min_value=1, max_value=5, default=5)

    class Meta:
        icon = "openquote"
        label = "Testimonial"


class TestimonialBlock(blocks.StructBlock):
    """Testimonial carousel or grid."""

    title = blocks.CharBlock(required=False, default="What our readers say")
    testimonials = blocks.ListBlock(TestimonialItemBlock())
    layout = blocks.ChoiceBlock(
        choices=[("carousel", "Carousel"), ("grid", "Grid")],
        default="carousel",
    )

    class Meta:
        icon = "group"
        label = "Testimonials"


class RelatedContentBlock(blocks.StructBlock):
    """Manual list of related pages / posts."""

    title = blocks.CharBlock(required=False, default="Related Articles")
    pages = blocks.ListBlock(blocks.PageChooserBlock())

    class Meta:
        icon = "link"
        label = "Related Content"


# ─────────────────────────────────────────────────────────────────────────────
# Master StreamField definition
# ─────────────────────────────────────────────────────────────────────────────

BLOG_BODY_BLOCKS = [
    ("heading", HeadingBlock()),
    ("paragraph", ParagraphBlock()),
    ("rich_text", RichTextBlock()),
    ("quote", QuoteBlock()),
    ("code", CodeBlock()),
    ("markdown", MarkdownBlock()),
    ("image", ImageBlock()),
    ("gallery", GalleryBlock()),
    ("embed", VideoEmbedBlock()),
    ("youtube", YouTubeBlock()),
    ("button", ButtonBlock()),
    ("cta", CTABlock()),
    ("faq", FAQBlock()),
    ("statistics", StatisticsBlock()),
    ("features", FeatureBlock()),
    ("testimonials", TestimonialBlock()),
    ("related_content", RelatedContentBlock()),
]

PAGE_BODY_BLOCKS = BLOG_BODY_BLOCKS + [
    ("hero", HeroBlock()),
]
