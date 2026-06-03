import os
import sys
import django

# Set up Django environment
sys.path.append(os.getcwd())
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.development")
django.setup()

from wagtail.models import Page
from apps.blog.models import BlogIndexPage, BlogPage
from apps.authors.models import AuthorIndexPage, AuthorPage
from django.utils import timezone

from wagtail.rich_text import RichText

def create_sample_content():
    print("--- Creating Sample Content ---")
    
    # 1. Get Blog Index
    blog_index = BlogIndexPage.objects.live().first()
    if not blog_index:
        print("BlogIndexPage not found. Run setup_blog.py first.")
        return

    # 2. Setup Author Index and Author
    root_page = Page.objects.get(id=1)
    author_index = AuthorIndexPage.objects.live().first()
    if not author_index:
        print("Creating AuthorIndexPage...")
        author_index = AuthorIndexPage(title="Authors", slug="authors")
        root_page.add_child(instance=author_index)
        author_index.save_revision().publish()

    author = AuthorPage.objects.live().filter(slug="antigravity").first()
    if not author:
        print("Creating Sample Author...")
        author = AuthorPage(
            title="Antigravity AI",
            slug="antigravity",
            role="Autonomous Coding Agent",
            bio="An expert AI architect specialized in Django and Wagtail ecosystems.",
        )
        author_index.add_child(instance=author)
        author.save_revision().publish()

    # 3. Create Sample Blog Post
    post = BlogPage.objects.live().filter(slug="hello-wagtail").first()
    if not post:
        print("Creating Sample Blog Post...")
        post = BlogPage(
            title="Hello Wagtail: The Future of Agentic CMS",
            slug="hello-wagtail",
            excerpt="An introduction to building autonomous blogging ecosystems within Wagtail.",
            published_date=timezone.now(),
            author=author,
            body=[
                ('heading', {'text': 'Why Wagtail for Agents?', 'level': 'h2'}),
                ('paragraph', {'text': RichText('Wagtail provides the perfect balance of flexibility and structure for AI-driven applications.')}),
                ('rich_text', RichText('Wagtail is built on Django, making it robust and scalable.')),
                ('code', {'language': 'python', 'code': 'def hello_agent():\n    print("Welcome to Moon Gravity")'}),
            ]
        )
        blog_index.add_child(instance=post)
        post.save_revision().publish()
        print("Sample Blog Post created successfully.")
    else:
        print("Sample Blog Post 'hello-wagtail' already exists.")

if __name__ == "__main__":
    create_sample_content()
