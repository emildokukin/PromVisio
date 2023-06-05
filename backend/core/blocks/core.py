from wagtail import blocks

from .technical import APIImageChooserBlock


class TeamBlock(blocks.StructBlock):
    title = blocks.CharBlock(label="Заголовок блока", default="Команда и оборудование")
    text1 = blocks.TextBlock(label="Подзаголовок")
    images = blocks.ListBlock(APIImageChooserBlock, label="Изображения")
    text2 = blocks.TextBlock(label="Текст после слайдера")

    class Meta:
        label = "Команда"
