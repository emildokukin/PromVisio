# Generated by Django 4.2.2 on 2023-07-11 10:35

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0014_alter_feedback_message_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="sitesettings",
            name="analytics_code",
            field=models.TextField(blank=True, verbose_name="Код счетчиков аналитики"),
        ),
    ]
