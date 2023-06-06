from django.core.exceptions import ValidationError
from django.db import models
from modelcluster.fields import ParentalKey
from wagtail.images import get_image_model
from wagtail.models import Orderable

from core.blocks import make_iframe

Image = get_image_model()


def validate_video(value):
    iframe = make_iframe(value)
    if iframe is None:
        raise ValidationError("Неверные данные видео")


class GalleryVideo(Orderable):
    page = ParentalKey(
        "core.GalleryPage", on_delete=models.CASCADE, related_name="videos"
    )
    url_or_iframe = models.CharField(
        max_length=255,
        verbose_name="Код для встраивания",
        help_text="Тут должен быть iframe или ссылка на youtube/rutube",
        validators=[validate_video],
    )
    iframe = models.CharField(
        verbose_name="Iframe", max_length=255, blank=True, null=True, editable=False
    )
    thumbnail = models.ForeignKey(
        Image, on_delete=models.PROTECT, related_name="+", verbose_name="Превью видео"
    )

    def save(
        self, force_insert=False, force_update=False, using=None, update_fields=None
    ):
        self.iframe = make_iframe(self.url_or_iframe)
        super().save(force_insert, force_update, using, update_fields)

    class Meta:
        verbose_name = "Видео"
        verbose_name_plural = "Видео"
        ordering = ["sort_order"]


class GalleryImage(Orderable):
    page = ParentalKey(
        "core.GalleryPage", on_delete=models.CASCADE, related_name="images"
    )
    image = models.ForeignKey(
        Image, on_delete=models.PROTECT, verbose_name="Фотография", related_name="+"
    )

    class Meta:
        verbose_name = "Фото"
        verbose_name_plural = "Фото"
        ordering = ["sort_order"]


class PotentialPageImage(Orderable):
    page = ParentalKey(
        "core.PotentialPage", on_delete=models.CASCADE, related_name="images"
    )
    image = models.ForeignKey(
        Image, on_delete=models.PROTECT, verbose_name="Фотография", related_name="+"
    )
    use_in_slider = models.BooleanField(
        default=False, verbose_name="Использовать в слайдере"
    )

    class Meta:
        verbose_name = "Фото"
        verbose_name_plural = "Фото"
        ordering = ["sort_order"]


class PotentialPageVideo(Orderable):
    page = ParentalKey(
        "core.PotentialPage", on_delete=models.CASCADE, related_name="videos"
    )
    url_or_iframe = models.CharField(
        max_length=255,
        verbose_name="Код для встраивания",
        help_text="Тут должен быть iframe или ссылка на youtube/rutube",
        validators=[validate_video],
    )
    iframe = models.CharField(
        verbose_name="Iframe", max_length=255, blank=True, editable=False
    )
    thumbnail = models.ForeignKey(
        Image, on_delete=models.PROTECT, related_name="+", verbose_name="Превью видео"
    )

    def save(
        self, force_insert=False, force_update=False, using=None, update_fields=None
    ):
        self.iframe = make_iframe(self.url_or_iframe)
        super().save(force_insert, force_update, using, update_fields)

    class Meta:
        verbose_name = "Видео"
        verbose_name_plural = "Видео"
        ordering = ["sort_order"]
