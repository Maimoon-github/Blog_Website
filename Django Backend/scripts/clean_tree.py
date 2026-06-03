import os
import sys
import django

# Set up Django environment
sys.path.append(os.getcwd())
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.development")
django.setup()

from wagtail.models import Page
from apps.blog.models import BlogIndexPage

def clean_and_fix():
    print("--- Cleaning and Fixing Wagtail Tree ---")
    
    # 1. Remove duplicate BlogIndexPage if they are empty
    indexes = BlogIndexPage.objects.all()
    if indexes.count() > 1:
        print(f"Found {indexes.count()} BlogIndexPages. Cleaning up...")
        # Keep the one with ID 4 (or the one named 'Blog')
        for idx in indexes:
            if idx.id != 4 and idx.title != "Blog":
                print(f"Deleting duplicate index: {idx.title} (ID: {idx.id})")
                idx.delete()
    
    # 2. Fix the tree
    print("Fixing tree consistency...")
    Page.fix_tree()
    print("Tree fixed.")

if __name__ == "__main__":
    clean_and_fix()
