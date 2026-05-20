from wagtail import blocks
from wagtail.images.blocks import ImageChooserBlock


class TeamMemberBlock(blocks.StructBlock):
    name = blocks.CharBlock(required=True)
    role = blocks.CharBlock(required=False)
    photo = ImageChooserBlock(required=False)
    bio = blocks.RichTextBlock(required=False)

    class Meta:
        icon = "user"
        template = "blocks/team_member.html"  # not used in headless, but kept for convention


class ServiceItemBlock(blocks.StructBlock):
    title = blocks.CharBlock(required=True)
    description = blocks.RichTextBlock(required=False)
    icon = blocks.CharBlock(required=False, help_text="CSS class or icon name")
    url = blocks.URLBlock(required=False)

    class Meta:
        icon = "list-ul"
        template = "blocks/service_item.html"