from rest_framework import fields, serializers

from core.blocks.technical import CustomImageSerializer
from core.models import PotentialPageVideo


class PotentialPageVideoSerializer(serializers.ModelSerializer):
    thumbnail = CustomImageSerializer()

    class Meta:
        model = PotentialPageVideo
        fields = ["thumbnail", "url_or_iframe"]


class PotentialPageSliderSerializer(fields.JSONField):
    def to_representation(self, page):
        images = [
            slide.image
            for slide in page.images.filter(use_in_slider=True).select_related("image")
        ]
        return CustomImageSerializer(images, many=True, context=self.context).data


class PotentialPageGallerySerializer(fields.JSONField):
    def to_representation(self, page):
        images = [slide.image for slide in page.images.select_related("image")]
        response = {
            "images": CustomImageSerializer(
                images, many=True, context=self.context
            ).data,
            "videos": PotentialPageVideoSerializer(
                page.videos.select_related("thumbnail"), many=True, context=self.context
            ).data,
        }
        return response
