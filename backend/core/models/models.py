from django.db import models


class Feedback(models.Model):
    subject = models.CharField(max_length=255, verbose_name="Тема")
    message = models.TextField(verbose_name="Сообщение")
    phone_number = models.CharField(max_length=15, verbose_name="Номер телефона")
    email = models.EmailField(verbose_name="Email")

    created_dt = models.DateTimeField(
        auto_now_add=True, verbose_name="Дата и время создания"
    )

    origin_page = models.CharField(
        max_length=255,
        null=True,
        blank=True,
        verbose_name="Страница, на которой был заполнен ответ",
    )

    def __str__(self):
        return f"Feedback #{self.pk}"

    class Meta:
        verbose_name = "Обратная связь"
        verbose_name_plural = "Обратная связь"
