from wagtail.admin.panels import FieldPanel
from wagtail.api import APIField
from wagtail.fields import StreamField
from wagtail.images import get_image_model
from wagtail.models import Page
from wagtail_headless_preview.models import HeadlessMixin

from core import blocks

Image = get_image_model()


class DefaultPage(HeadlessMixin, Page):
    class Meta:
        abstract = True


class HomePage(DefaultPage):
    template = "home/home_page.html"

    content = StreamField(
        blocks.HOMEPAGE_BLOCKS,
        use_json_field=True,
        verbose_name="Контент",
        null=True,
        blank=True,
    )

    content_panels = DefaultPage.content_panels + [
        FieldPanel("content"),
    ]

    api_fields = [
        APIField("content"),
    ]

    class Meta:
        verbose_name = "Главная"
        verbose_name_plural = "Главная"
