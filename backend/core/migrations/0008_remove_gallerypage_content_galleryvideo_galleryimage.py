# Generated by Django 4.2.2 on 2023-06-06 23:06

from django.db import migrations, models
import django.db.models.deletion
import modelcluster.fields


class Migration(migrations.Migration):
    dependencies = [
        ("wagtailimages", "0025_alter_image_file_alter_rendition_file"),
        ("core", "0007_alter_potentialpageimage_options_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="gallerypage",
            name="content",
        ),
        migrations.CreateModel(
            name="GalleryVideo",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "sort_order",
                    models.IntegerField(blank=True, editable=False, null=True),
                ),
                (
                    "url_or_iframe",
                    models.CharField(
                        max_length=255, verbose_name="Код для встраивания"
                    ),
                ),
                (
                    "iframe",
                    models.CharField(
                        blank=True,
                        editable=False,
                        max_length=255,
                        null=True,
                        verbose_name="Iframe",
                    ),
                ),
                (
                    "page",
                    modelcluster.fields.ParentalKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="videos",
                        to="core.gallerypage",
                    ),
                ),
                (
                    "thumbnail",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT,
                        related_name="+",
                        to="wagtailimages.image",
                        verbose_name="Превью видео",
                    ),
                ),
            ],
            options={
                "verbose_name": "Видео",
                "verbose_name_plural": "Видео",
                "ordering": ["sort_order"],
            },
        ),
        migrations.CreateModel(
            name="GalleryImage",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "sort_order",
                    models.IntegerField(blank=True, editable=False, null=True),
                ),
                (
                    "image",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT,
                        related_name="+",
                        to="wagtailimages.image",
                        verbose_name="Фотография",
                    ),
                ),
                (
                    "page",
                    modelcluster.fields.ParentalKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="images",
                        to="core.gallerypage",
                    ),
                ),
            ],
            options={
                "verbose_name": "Фото",
                "verbose_name_plural": "Фото",
                "ordering": ["sort_order"],
            },
        ),
    ]
