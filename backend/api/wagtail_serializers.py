from rest_framework import fields, serializers

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

        images_serializer = CustomImageSerializer(
            images_page, many=True, context=self.context
        )
        videos_serializer = PotentialPageVideoSerializer(
            videos_page, many=True, context=self.context
        )

        return {
            "images": images_paginator.get_paginated_response(
                images_serializer.data
            ).data,
            "videos": videos_paginator.get_paginated_response(
                videos_serializer.data
            ).data,
        }
