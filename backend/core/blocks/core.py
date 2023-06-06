from wagtail import blocks

from .technical import APIImageChooserBlock
from .utils import make_iframe


class TeamBlock(blocks.StructBlock):
    title = blocks.CharBlock(label="Заголовок блока", default="Команда и оборудование")
    text1 = blocks.TextBlock(label="Подзаголовок")
    images = blocks.ListBlock(APIImageChooserBlock, label="Изображения")
    text2 = blocks.TextBlock(label="Текст после слайдера")

    class Meta:
        label = "Команда"


class GalleryPhotoItem(blocks.StructBlock):
    image = APIImageChooserBlock(label="Изображение")

    class Meta:
        label = "Фото"


class GalleryVideoItem(blocks.StructBlock):
    url_or_iframe = blocks.CharBlock(
        label="Код для встраивания",
        help_text="Тут должен быть iframe или ссылка на youtube/rutube",
    )
    iframe = blocks.CharBlock(
        label="Iframe",
        required=False,
        editable=False,
        help_text="Это поле заполняется автоматически",
    )
    thumbnail = APIImageChooserBlock(label="Превью видео")

    def get_api_representation(self, value, context=None):
        response = super().get_api_representation(value, context)
        del response["url_or_iframe"]
        return response

    def clean(self, value):
        result = super().clean(value)
        if result["iframe"]:
            return result

        result["iframe"] = make_iframe(result["url_or_iframe"])
        return super().clean(result)

    class Meta:
        label = "Видео"
        icon = "media"


class GalleryPhotosBlock(blocks.StructBlock):
    title = blocks.CharBlock(label="Заголовок раздела", default="Фото")
    items = blocks.ListBlock(GalleryPhotoItem, label="Изображения")

    class Meta:
        label = "Фотографии"


class GalleryVideosBlock(blocks.StructBlock):
    title = blocks.CharBlock(label="Заголовок раздела", default="Видео")
    items = blocks.ListBlock(GalleryVideoItem, label="Видео")

    class Meta:
        label = "Видео"
