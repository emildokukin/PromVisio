from django.utils.decorators import method_decorator
from django.views.decorators.clickjacking import xframe_options_exempt
from django.views.generic import TemplateView


@method_decorator(xframe_options_exempt, name="dispatch")
class AdminPagePreview(TemplateView):
    template_name = "core/home_page.html"
