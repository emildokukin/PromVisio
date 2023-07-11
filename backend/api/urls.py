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
    path(
        "articles/<int:news_page_id>/",
        views.APIArticlesView.as_view(),
        name="articles-list",
    ),
    path("config/", views.ConfigView.as_view()),
    path("", api_router.urls),
]
