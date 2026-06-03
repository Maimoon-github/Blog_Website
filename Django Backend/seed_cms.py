import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.development')
django.setup()

from wagtail.models import Page, Site
from apps.pages.models import HomePage, AboutPage, ContactPage, ServicesPage, PrivacyPolicyPage, TermsPage
from apps.blog.models import BlogIndexPage, BlogPage
from apps.authors.models import AuthorPage
from apps.taxonomy.models import Category, Tag
from apps.seo.models import SiteSettings, NavigationSettings, ContactSettings, MenuItem

def seed():
    root = Page.objects.get(id=1)
    
    # 1. HomePage
    home = HomePage.objects.filter(slug="home").first()
    if not home:
        Page.objects.filter(slug="home").delete()
        home = HomePage(
            title="Earth & Escape",
            slug="home",
            hero_heading="Where Sustainable Design Meets Absolute Sanctuary",
            hero_subheading="Discover beautiful, low-impact cob and rammed-earth architectures.",
            hero_cta_label="Explore Journal",
            hero_cta_url="/blog",
        )
        root.add_child(instance=home)
    home.save_revision().publish()
    
    # 2. Site
    site = Site.objects.first()
    if site:
        site.root_page = home
        site.save()
    else:
        site = Site.objects.create(hostname="localhost", port=3000, root_page=home, is_default_site=True)

    # 3. Blog Index
    blog_index = BlogIndexPage.objects.filter(slug="blog").first()
    if not blog_index:
        blog_index = BlogIndexPage(
            title="Journal",
            slug="blog",
            intro="<p>Our latest insights on organic architecture and luxury travel.</p>"
        )
        home.add_child(instance=blog_index)
    blog_index.save_revision().publish()

    # 4. Settings
    settings = SiteSettings.for_site(site)
    settings.site_name = "Earth & Escape"
    settings.site_description = "Sustainable architecture and luxury escapes."
    settings.save()

    nav = NavigationSettings.for_site(site)
    nav.save()

    # Clear existing menu items and seed new ones
    MenuItem.objects.all().delete()
    MenuItem.objects.create(menu="header", label="Home", url="/", order=1)
    MenuItem.objects.create(menu="header", label="Journal", url="/blog", order=2)
    MenuItem.objects.create(menu="header", label="About", url="/about", order=3)
    MenuItem.objects.create(menu="header", label="Services", url="/services", order=4)
    MenuItem.objects.create(menu="header", label="Contact", url="/contact", order=5)

    MenuItem.objects.create(menu="footer_primary", label="Privacy Policy", url="/privacy-policy", order=1)
    MenuItem.objects.create(menu="footer_primary", label="Terms & Conditions", url="/terms", order=2)

    contact = ContactSettings.for_site(site)
    contact.email = "hello@earthandescape.com"
    contact.phone = "+44 20 7946 0958"
    contact.address = "123 Organic Way, Cobshire, UK"
    contact.save()

    print("Seeding complete!")

if __name__ == "__main__":
    seed()
