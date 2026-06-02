
# Technical Architecture & Research Report: `apps.common`

## Executive Summary

The `apps.common` module functions as the foundational core structural layer of a headless Wagtail CMS backend integrated with a Next.js frontend web platform. By abandoning server-side Django template rendering (`template = None`), the application abstracts the content schema completely into highly granular, reusable Wagtail `StreamField` components configured specifically for clean JSON serialization.

Additionally, the application features standalone data utilities that manage cross-boundary concerns like sanitizing data streams, calculating metadata (e.g., reading metrics via algorithmic estimation), and safely extracting dynamic multi-format image rendition paths for remote delivery.

---

## 1. System Topology & Architectural Concept

In traditional implementations, Wagtail renders individual block types directly via standard server-side Django templates. The `apps.common` module shifts this pattern by turning the backend into an agnostic JSON registry.

### Architectural Roles:

* **The Content Engine (Django/Wagtail):** Hosts structural configurations, data capture panels, relationships, validation, and content authoring layouts.
* **The Transpilation Pipeline (`blocks.py`):** Translates rich administrative interactions directly into structural schemas configured for cross-origin consumption.
* **The Processing Layer (`utils.py`):** Cleans nested data packets, processes layout hierarchies, computes SEO/readability properties, and transforms relative assets into absolute remote endpoints.

---

## 2. Deep Module Hierarchy & Structural Specs

```
apps/common/
├── __init__.py      # Module discovery hook
├── apps.py          # App registry definitions
├── blocks.py        # StreamField structural block definitions
└── utils.py         # Data processing, string, and image engines

```

### 2.1 Application Configuration (`apps.py`)

Provides application initialization parameters for the Django app ecosystem.

* **Class Namespace:** `CommonConfig(AppConfig)`
* **Module Pathway:** `apps.common`
* **Default Meta Type:** Auto-incrementing 64-bit integer standard field (`django.db.models.BigAutoField`)
* **Verbose Name Identifier:** `"Common"`

### 2.2 Core Structural Registry (`blocks.py`)

This module aggregates layout and structural choices into discrete, atomic block elements mapped directly to corresponding UI components within the Next.js visual system.

#### Typography & Primitive Blocks

* **`HeadingBlock` (`blocks.StructBlock`):** Maps logical sections.
* *Properties:* Includes a required text field and a programmatic choice dropdown (`h2`, `h3`, `h4`, `h5`) defaulting to `h2`.
* *Deep-Linking:* Features an optional `anchor_id` field enabling the generation of deep-linking slug identifiers.
* *Headless Override:* Sets `template = None` explicitly to avoid local disk checks for templates.


* **`ParagraphBlock` (`blocks.StructBlock`):** Handles text content by configuring a standard `RichTextBlock` restricted to structural parameters: `bold`, `italic`, `link`, `ol`, `ul`, `hr`, `superscript`, and `subscript`.
* **`RichTextBlock` (`blocks.RichTextBlock`):** An advanced, multi-tier editor configuration supporting full typography and embed arrays (`h2`, `h3`, `h4`, text decorations, tables, blocks, quotes, custom image insertion, and media codes).
* **`QuoteBlock` (`blocks.StructBlock`):** Handles quote attributes, offering fields for text quotes, string citations, and explicit URL properties for source tracing.

#### Layout & Technical Components

* **`CodeBlock` (`blocks.StructBlock`):** Standardizes technical content distribution.
* *Syntax Engines:* Hardcoded enumeration targets including `python`, `javascript`, `typescript`, `jsx`, `html`, `css`, `bash`, `json`, `yaml`, `sql`, `go`, `rust`, and `plaintext`.
* *File Context:* Captures code input alongside an optional `filename` string field for rendering realistic IDE layout headers.


* **`MarkdownBlock` (`blocks.TextBlock`):** Evaluates as raw text, passing pure markdown content to the Next.js target for client-side rendering.

#### Composition & Master Streams

The application registers composite structures (`HeroBlock`, `GalleryBlock`, `VideoEmbedBlock`, `YouTubeBlock`, `ButtonBlock`, `CTABlock`, `FAQBlock`, `StatisticsBlock`, `FeatureBlock`, `TestimonialBlock`, `RelatedContentBlock`) and channels them into two main master configurations:

1. **`BLOG_BODY_BLOCKS`**: Features all base elements required for deep technical content editing.
2. **`PAGE_BODY_BLOCKS`**: Inherits all elements from `BLOG_BODY_BLOCKS` and appends full-width graphic components (`hero`) for general application page layouts.

---

### 2.3 Utility Engine (`utils.py`)

A pure-Python collection of helper functions providing mathematical and algorithmic data mutations on structural layouts.

#### Algorithmic Reading Tracker

The parsing pipeline handles reading metric estimates through the execution of `calculate_reading_time` and `extract_text_from_streamfield`.

* **Text Parsing Loop (`extract_text_from_streamfield`):** Since Wagtail complex blocks store content as deep lists and dictionary structures, this utility uses a recursive algorithm (`_recurse`). It flattens all internal data states, matches substrings, and uses regular expressions to replace HTML markup tags with clear spaces (`re.sub(r"<[^>]+>", " ", obj)`).
* **Mathematical Calculation Engine (`calculate_reading_time`):** Processes plain string inputs and uses a ceiling mathematical formula to guarantee a non-zero runtime assessment:

$$T_{\text{read}} = \max\left(1, \left\lceil \frac{W}{W_{\text{wpm}}} \right\rceil\right)$$

Where $W$ represents total word count split via structural whitespaces, and $W_{\text{wpm}}$ represents the words-per-minute indexing factor (defaulted to $200$).

#### Asset Transformation Tools

* **Dynamic Rendition Processing (`get_image_rendition_url`):** Safely interacts with Wagtail's internal image engine by intercepting runtime validation faults. It accepts an image object alongside filter operations (e.g., `fill-800x400|jpegquality-80`), calls the internal `.get_rendition()` processor, and returns the unique media asset string or `None` if an error occurs.
* **Absolute URL Builder (`build_absolute_url`):** Translates localized relative media strings into fully-qualified location paths, allowing decoupled external frontends to locate internal assets.

---

## 3. Supplementary Files & Reference Implementations

To complete the setup of this headless module, additional reference implementations are detailed below to demonstrate how `PAGE_BODY_BLOCKS` and utilities interact with Django REST Framework (DRF) fields and Wagtail base page models.

### Supplementary File 1: Content Model Configuration (`models.py`)

```python
# apps/common/models.py
from django.db import models
from wagtail.models import Page
from wagtail.fields import StreamField
from wagtail.api import APIField

from apps.common.blocks import PAGE_BODY_BLOCKS
from apps.common.utils import extract_text_from_streamfield, calculate_reading_time

class GeneralFlexPage(Page):
    """
    A polymorphic content canvas used across generic platform spaces,
    serializing page models cleanly over headless APIs.
    """
    body = StreamField(PAGE_BODY_BLOCKS, use_json_field=True, blank=True)
    
    # Meta Properties
    estimated_reading_minutes = models.IntegerField(editable=False, default=1)

    def save(self, *args, **kwargs):
        # Flatten content structures to compute reading metrics before saving
        raw_text = extract_text_from_streamfield(self.body)
        self.estimated_reading_minutes = calculate_reading_time(raw_text)
        super().save(*args, **kwargs)

    content_panels = Page.content_panels + [
        # Standard administrative structural configurations
    ]

    api_fields = [
        APIField('body'),
        APIField('estimated_reading_minutes'),
    ]

```

### Supplementary File 2: Custom Headless API Serializer (`serializers.py`)

```python
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

```

---

## 4. Architectural Analysis & Core Recommendations

### 1. Address Multi-Element Block Declarations

While `BLOG_BODY_BLOCKS` references items like `image`, `gallery`, `faq`, and `testimonials`, these composite structural schemas were not explicitly defined inside the provided `blocks.py` layout.

* **Action:** Ensure these missing structural blocks match the naming pattern of your atomic blocks (`HeadingBlock`, `ParagraphBlock`) and implement explicit serialization routines for each nested item.

### 2. Implement RichText Processing inside APIs

Wagtail records references internally as data nodes (`<a linktype="page" id="5">...</a>`). The default REST Framework compiler streams these nodes raw, which can break client-side rendering on decoupled frontends.

* **Action:** Pass rich text fields through an internal conversion pipeline using Wagtail's native `expand_db_html` utility within a custom API field or serializer method before transmission to your Next.js application.