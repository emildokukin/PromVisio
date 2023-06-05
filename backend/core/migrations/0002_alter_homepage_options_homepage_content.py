# Generated by Django 4.2.2 on 2023-06-05 22:42

import core.blocks.technical
from django.db import migrations
import wagtail.blocks
import wagtail.fields


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0001_initial"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="homepage",
            options={"verbose_name": "Главная", "verbose_name_plural": "Главная"},
        ),
        migrations.AddField(
            model_name="homepage",
            name="content",
            field=wagtail.fields.StreamField(
                [
                    (
                        "team",
                        wagtail.blocks.StructBlock(
                            [
                                (
                                    "title",
                                    wagtail.blocks.CharBlock(
                                        default="Команда и оборудование",
                                        label="Заголовок блока",
                                    ),
                                ),
                                (
                                    "text1",
                                    wagtail.blocks.TextBlock(label="Подзаголовок"),
                                ),
                                (
                                    "images",
                                    wagtail.blocks.ListBlock(
                                        core.blocks.technical.APIImageChooserBlock,
                                        label="Изображения",
                                    ),
                                ),
                                (
                                    "text2",
                                    wagtail.blocks.TextBlock(
                                        label="Текст после слайдера"
                                    ),
                                ),
                            ]
                        ),
                    )
                ],
                blank=True,
                null=True,
                use_json_field=True,
                verbose_name="Контент",
            ),
        ),
    ]
