from django.contrib.contenttypes.models import ContentType
from django.http import Http404
from django.urls import path
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from drf_spectacular.utils import extend_schema, OpenApiParameter
from rest_framework import generics
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from wagtail.api.v2.views import PagesAPIViewSet
from wagtail_headless_preview.models import PagePreview

from api import serializers
from core import models
from core.services import notify_admin_about_feedback


class CustomPagesAPIViewSet(PagesAPIViewSet):
    @classmethod
    def get_urlpatterns(cls):
        """listing_view is removed"""
        return [
            path("<int:pk>/", cls.as_view({"get": "detail_view"}), name="detail"),
            path("find/", cls.as_view({"get": "find_view"}), name="find"),
        ]

    @extend_schema(
        parameters=[
            OpenApiParameter(name="html_path", description="Path", type=str),
        ]
    )
    def find_view(self, request):
        return super().find_view(request)

    @method_decorator(cache_page(10))
    def detail_view(self, request, pk):
        return super().detail_view(request, pk)


class PagePreviewAPIViewSet(PagesAPIViewSet):
    known_query_parameters = PagesAPIViewSet.known_query_parameters.union(
        ["content_type", "token"]
    )

    @classmethod
    def get_urlpatterns(cls):
        """
        This returns a list of URL patterns for the endpoint
        """
        return [
            path("", cls.as_view({"get": "detail_view"}), name="listing"),
        ]

    @extend_schema(
        parameters=[
            OpenApiParameter(name="content_type", type=str),
            OpenApiParameter(name="token", type=str),
        ]
    )
    def detail_view(self, request, pk=None):
        page = self.get_object()
        serializer = self.get_serializer(page)
        return Response(serializer.data)

    def get_object(self):
        if not self.request.GET.get("content_type") or not self.request.GET.get(
            "token"
        ):
            raise Http404("No data")
        app_label, model = self.request.GET["content_type"].split(".")

        content_type = get_object_or_404(ContentType, app_label=app_label, model=model)
        page_preview = get_object_or_404(
            PagePreview, content_type=content_type, token=self.request.GET["token"]
        )
        page = page_preview.as_page()
        if not page.pk:
            # fake primary key to stop API URL routing from complaining
            page.pk = 0

        return page


class FeedbackCreateView(generics.CreateAPIView):
    queryset = models.Feedback.objects.all()
    serializer_class = serializers.FeedbackSerializer
    authentication_classes = []  # костыль для исправления csrf ошибки для залогиненных

    def perform_create(self, serializer):
        origin_page = self.request.META.get("HTTP_REFERER")
        serializer.save(origin_page=origin_page)
        notify_admin_about_feedback(serializer)


class APIGalleryImagesView(generics.ListAPIView):
    pass


class APIGalleryVideosView(generics.ListAPIView):
    pass
