from django.urls import path
from wagtail.api.v2.router import WagtailAPIRouter

from api import views

api_router = WagtailAPIRouter("wagtailapi")
api_router.register_endpoint("pages", views.CustomPagesAPIViewSet)
api_router.register_endpoint("preview", views.PagePreviewAPIViewSet)

urlpatterns = [
    path("feedback/", views.FeedbackCreateView.as_view()),
    path(
        "gallery/<int:page_id>/images/",
        views.APIGalleryImagesView.as_view(),
        name="gallery-images",
    ),
    path(
        "gallery/<int:page_id>/videos/",
        views.APIGalleryVideosView.as_view(),
        name="gallery-videos",
    ),
    path("", api_router.urls),
]
