from django.urls import path
from wagtail.api.v2.router import WagtailAPIRouter

from api import views

api_router = WagtailAPIRouter("wagtailapi")
api_router.register_endpoint("pages", views.CustomPagesAPIViewSet)
api_router.register_endpoint("preview", views.PagePreviewAPIViewSet)

urlpatterns = [
    path("", api_router.urls),
]
