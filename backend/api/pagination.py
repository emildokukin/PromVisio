from collections import OrderedDict

from django.urls import reverse
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.utils.urls import replace_query_param, remove_query_param


class DynamicReversePathPagination(PageNumberPagination):
    reverse_url_name = None
    path_kwarg_name = None

    def __init__(self, page_id=None):
        self.page_id = page_id

    def get_url(self):
        if self.page_id is None:
            return self.request.build_absolute_uri()
        url = reverse(
            self.reverse_url_name, kwargs={self.path_kwarg_name: self.page_id}
        )
        return self.request.build_absolute_uri(url)

    def get_next_link(self):
        if not self.page.has_next():
            return None
        url = self.get_url()
        page_number = self.page.next_page_number()
        return replace_query_param(url, self.page_query_param, page_number)

    def get_previous_link(self):
        if not self.page.has_previous():
            return None
        url = self.get_url()
        page_number = self.page.previous_page_number()
        if page_number == 1:
            return remove_query_param(url, self.page_query_param)
        return replace_query_param(url, self.page_query_param, page_number)


class GalleryPagination(DynamicReversePathPagination):
    page_size = 2
    reverse_url_name = "gallery-images"
    path_kwarg_name = "page_id"

    def get_paginated_response(self, data):
        return Response(
            OrderedDict(
                [
                    ("count", self.page.paginator.count),
                    ("total_pages", self.page.paginator.num_pages),
                    ("next", self.get_next_link()),
                    ("previous", self.get_previous_link()),
                    ("results", data),
                ]
            )
        )


class GalleryVideosPagination(GalleryPagination):
    reverse_url_name = "gallery-videos"
    path_kwarg_name = "page_id"


class ArticlesPagination(GalleryPagination):
    page_size = 6
    reverse_url_name = "articles-list"
    path_kwarg_name = "news_page_id"
