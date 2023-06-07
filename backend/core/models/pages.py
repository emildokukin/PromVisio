from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.utils import timezone
from wagtail.admin.panels import FieldPanel, InlinePanel, MultiFieldPanel
from wagtail.api import APIField
from wagtail.fields import StreamField, RichTextField
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


class ArticlePage(DefaultPage):
    datetime = models.DateTimeField(default=timezone.now, verbose_name="Дата и время")

    source_link = models.URLField(
        verbose_name="Ссылка внешний источник", null=True, blank=True
    )
    source_link_name = models.CharField(
        verbose_name="Название ссылки на внешний источник", null=True, blank=True
    )
    source_link_in_new_tab = models.BooleanField(
        blank=True, verbose_name="Открывать в новой вкладке"
    )

    body = RichTextField(verbose_name="Контент")

    right_side = StreamField(
        blocks.ARTICLE_BLOCKS,
        use_json_field=True,
        verbose_name="Контент справа",
    )

    content_panels = DefaultPage.content_panels + [
        FieldPanel("datetime"),
        MultiFieldPanel(
            [
                FieldPanel("source_link_name"),
                FieldPanel("source_link"),
                FieldPanel("source_link_in_new_tab"),
            ],
            heading="Источник",
            classname="collapsible collapsed",
        ),
        FieldPanel("body"),
        FieldPanel("right_side"),
    ]

    api_fields = [
        APIField("datetime"),
        APIField("source", serializer=serializers.ArticleSourceSerializer(source="*")),
        APIField("body", serializer=serializers.APIRichTextSerializer()),
        APIField("right_side"),
        APIField("similar", serializer=serializers.ArticlePageSerializer(many=True)),
    ]

    def clean(self):
        if self.source_link and not self.source_link_name:
            raise ValidationError('Нужно указать "Название ссылки на внешний источник"')

    @property
    def banner(self):
        for block in self.right_side:
            if block.block_type == "image":
                return block.value

    @property
    def preview_text(self) -> str:
        return RichTextField().get_searchable_content(self.body)[0][:300]

    @property
    def similar(self):
        return (
            self.get_siblings(inclusive=False)
            .live()
            .public()
            .type(ArticlePage)
            .specific
        )

    class Meta:
        verbose_name = "Статья"
        verbose_name_plural = "Статьи"
        ordering = ["-datetime"]
