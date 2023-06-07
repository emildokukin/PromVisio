from rest_framework import fields, serializers
from wagtail.rich_text import expand_db_html

from api.pagination import GalleryPagination, GalleryVideosPagination
from core.blocks.technical import CustomImageSerializer
from core.models import PotentialPageVideo


class PotentialPageVideoSerializer(serializers.ModelSerializer):
    thumbnail = CustomImageSerializer()

    class Meta:
        model = PotentialPageVideo
        fields = ["thumbnail", "iframe"]


class PotentialPageSliderSerializer(fields.JSONField):
    def to_representation(self, page):
        images = [
            slide.image
            for slide in page.images.filter(use_in_slider=True).select_related("image")
        ]
        return CustomImageSerializer(images, many=True, context=self.context).data


class PotentialPageGallerySerializer(fields.JSONField):
    def to_representation(self, page):
        images_paginator = GalleryPagination(page_id=page.pk)
        images_paginator.page_size = page.pagination_page_size
        videos_paginator = GalleryVideosPagination(page_id=page.pk)
        videos_paginator.page_size = page.pagination_page_size

        images = [slide.image for slide in page.images.select_related("image")]
        videos = page.videos.select_related("thumbnail")

        images_page = images_paginator.paginate_queryset(
            images, self.context["request"]
        )
        videos_page = videos_paginator.paginate_queryset(
            videos, self.context["request"]
        )

        images_data = CustomImageSerializer(
            images_page, many=True, context=self.context
        ).data
        videos_data = PotentialPageVideoSerializer(
            videos_page, many=True, context=self.context
        ).data

        return {
            "images": images_paginator.get_paginated_response(images_data).data,
            "videos": videos_paginator.get_paginated_response(videos_data).data,
        }


class APIRichTextSerializer(fields.CharField):
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        return expand_db_html(representation)


class ArticleSourceSerializer(fields.JSONField):
    def to_representation(self, article_page):
        if not article_page.source_link:
            return None

        return {
            "label": article_page.source_link_name,
            "link": article_page.source_link,
            "in_new_tab": article_page.source_link_in_new_tab,
        }


class ArticlePageSerializer(serializers.Serializer):
    title = serializers.CharField()
    url = serializers.CharField()
    datetime = serializers.DateTimeField()
    preview_text = serializers.CharField()
    source = ArticleSourceSerializer(source="*")
    banner = CustomImageSerializer()


class APIPreloadArticlesSerializer(fields.JSONField):
    def to_representation(self, news_page):
        from api.views import APIArticlesView

        request = self.context["request"]
        response = APIArticlesView().get(request, news_page.pk)
        return response.data
