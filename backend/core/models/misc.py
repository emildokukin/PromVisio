from django.db import models
from modelcluster.fields import ParentalKey
from wagtail.images import get_image_model
from wagtail.models import Orderable


Image = get_image_model()


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
    url_or_iframe = models.CharField(max_length=255, verbose_name="Код для встраивания")
    iframe = models.CharField(
        verbose_name="Iframe", max_length=255, blank=True, editable=False
    )
    thumbnail = models.ForeignKey(
        Image, on_delete=models.PROTECT, related_name="+", verbose_name="Превью видео"
    )

    class Meta:
        verbose_name = "Видео"
        verbose_name_plural = "Видео"
        ordering = ["sort_order"]
