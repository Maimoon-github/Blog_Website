import os
import sys
import django

# Set up Django environment
sys.path.append(os.getcwd())
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.development")
django.setup()

from wagtail.models import Page, Site
from apps.pages.models import HomePage, AboutPage, ContactPage, ServicesPage
from apps.blog.models import BlogIndexPage

def reconstruct_site():
    print("--- Reconstructing Site Tree ---")
    
    # 1. Get the default root page (id=1)
    try:
        root = Page.objects.get(id=1)
    except Page.DoesNotExist:
        print("Error: Default root page (id=1) not found.")
        return

    # 2. Create or Get HomePage
    home = HomePage.objects.first()
    if not home:
        # Check if there is a generic page with slug 'home' and delete it
        generic_home = Page.objects.filter(slug='home').first()
        if generic_home:
            print(f"Deleting generic page with slug 'home' (ID: {generic_home.id})")
            generic_home.delete()

        print("Creating HomePage...")
        home = HomePage(
            title="Moon Gravity Home",
            slug="home",
            hero_heading="Welcome to Moon Gravity",
            hero_subheading="Autonomous Agentic AI Ecosystem",
        )
        root.add_child(instance=home)
        home.save_revision().publish()
        print("HomePage created.")
    else:
        print(f"HomePage exists: {home.title}")

    # 3. Ensure pages are children of HomePage
    # First, fix tree and catch existing ones that might be misplaced
    Page.fix_tree()
    from apps.authors.models import AuthorIndexPage
    pages_to_move = [
        (AboutPage, "About Us", "about"),
        (ContactPage, "Contact Us", "contact"),
        (ServicesPage, "Our Services", "services"),
        (BlogIndexPage, "Blog", "blog"),
        (AuthorIndexPage, "Authors", "authors"),
    ]

    for model_cls, title, slug in pages_to_move:
        page = model_cls.objects.filter(slug=slug).first()
        if not page:
            print(f"Creating {title} Page...")
            page = model_cls(title=title, slug=slug)
            home.add_child(instance=page)
            page.save_revision().publish()
        else:
            # Move if it's currently a direct child of root or elsewhere
            current_parent = page.get_parent()
            if current_parent and current_parent.id != home.id:
                print(f"Moving {title} Page (ID: {page.id}) under Home...")
                page.move(home, 'last-child')
            else:
                print(f"{title} Page is correctly placed.")


    # 4. Set default Site to point to HomePage
    site = Site.objects.filter(is_default_site=True).first()
    if site:
        if site.root_page_id != home.id:
            print(f"Updating Site '{site.hostname}' to root at HomePage.")
            site.root_page = home
            site.save()
    else:
        print("Creating default Site at localhost...")
        Site.objects.create(
            hostname="localhost",
            port=8000,
            root_page=home,
            is_default_site=True,
            site_name="Moon Gravity"
        )

    print("--- Site Tree Reconstruction Complete ---")

if __name__ == "__main__":
    reconstruct_site()
