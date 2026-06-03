import os
import sys
import django

# Set up Django environment
sys.path.append(os.getcwd())
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.development")
django.setup()

from wagtail.models import Page, Site
from apps.blog.models import BlogIndexPage
from apps.pages.models import HomePage

def setup_blog():
    print("--- Initializing Blog Section ---")
    
    # 1. Find the root page or HomePage
    try:
        home_page = HomePage.objects.live().first()
        if not home_page:
            print("HomePage not found. Using the default root.")
            root_page = Page.objects.get(id=1) # The default root
        else:
            root_page = home_page
            print(f"Using HomePage: '{root_page.title}' (slug: {root_page.slug})")
    except Exception as e:
        print(f"Error finding root page: {e}")
        return

    # 2. Check if BlogIndexPage already exists
    blog_index = BlogIndexPage.objects.live().descendant_of(root_page).first()
    
    if blog_index:
        print(f"BlogIndexPage already exists: '{blog_index.title}' (URL: /blog)")
    else:
        print("Creating BlogIndexPage...")
        blog_index = BlogIndexPage(
            title="Blog",
            slug="blog",
            intro="Welcome to our technical blog. Explore the latest in AI and agentic ecosystems.",
            posts_per_page=10,
        )
        root_page.add_child(instance=blog_index)
        blog_index.save_revision().publish()
        print("BlogIndexPage created successfully.")

    # 3. Ensure a Wagtail Site is configured (standard for production readiness)
    site = Site.objects.filter(is_default_site=True).first()
    if site:
        print(f"Default site configured: {site.hostname}")
    else:
        print("Warning: No default Wagtail site configured. Please check Wagtail Admin.")

if __name__ == "__main__":
    setup_blog()
