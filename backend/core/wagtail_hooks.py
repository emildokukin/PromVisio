from wagtail.contrib.modeladmin.options import ModelAdmin, modeladmin_register

from core.models import Feedback
from core.permissions import FeedbackPermissionHelper


class FeedbackAdmin(ModelAdmin):
    model = Feedback
    list_display = ["subject", "message", "email", "phone_number", "created_dt"]
    menu_icon = "form"
    permission_helper_class = FeedbackPermissionHelper


modeladmin_register(FeedbackAdmin)
