from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from wagtail.admin.panels import FieldPanel, InlinePanel, MultiFieldPanel
from wagtail.api import APIField
from wagtail.fields import StreamField
from wagtail.models import Page
from wagtail_headless_preview.models import HeadlessMixin

from core import blocks
from api import wagtail_serializers as serializers


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


class GalleryPage(DefaultPage):
    pagination_page_size = models.IntegerField(
        default=6,
        verbose_name="Размер страницы пагинации галереи",
        validators=[MinValueValidator(1), MaxValueValidator(100)],
    )

    content_panels = DefaultPage.content_panels + [
        FieldPanel("pagination_page_size"),
        MultiFieldPanel(
            [
                InlinePanel("images", label="Фото"),
                InlinePanel("videos", label="Видео"),
            ],
            heading="Галерея",
        ),
    ]

    api_fields = [
        APIField(
            "gallery", serializer=serializers.PotentialPageGallerySerializer(source="*")
        ),
    ]

    class Meta:
        verbose_name = "Галерея"
        verbose_name_plural = "Галерея"


class PotentialPage(DefaultPage):
    pagination_page_size = models.IntegerField(
        default=6,
        verbose_name="Размер страницы пагинации галереи",
        validators=[MinValueValidator(1), MaxValueValidator(100)],
    )

    content_panels = DefaultPage.content_panels + [
        FieldPanel("pagination_page_size"),
        MultiFieldPanel(
            [
                InlinePanel("images", label="Фото"),
                InlinePanel("videos", label="Видео"),
            ],
            heading="Галерея",
        ),
    ]

    api_fields = [
        APIField(
            "slider", serializer=serializers.PotentialPageSliderSerializer(source="*")
        ),
        APIField(
            "gallery", serializer=serializers.PotentialPageGallerySerializer(source="*")
        ),
    ]

    class Meta:
        verbose_name = "ПРО Потенциал"
        verbose_name_plural = "ПРО Потенциал"
