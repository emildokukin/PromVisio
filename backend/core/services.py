import logging

from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import get_template

from api.serializers import FeedbackSerializer
from core.models import SiteSettings


def notify_admin_about_feedback(serializer: FeedbackSerializer) -> None:
    template = get_template("emails/create_feedback.txt")
    email_text = template.render(context=serializer.data)
    admin_email = SiteSettings.for_request(serializer.context["request"]).feedback_email
    send_notify_email(email_text, "Форма обратной связи", admin_email)


def send_notify_email(message: str, subject: str, admin_email: str) -> None:
    if not settings.EMAIL_HOST_USER or "@" not in settings.EMAIL_HOST_USER:
        logging.error("Invalid EMAIL_HOST_USER")

    send_mail(subject, message, None, recipient_list=[admin_email])
