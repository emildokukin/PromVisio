import logging

from django.core.exceptions import ValidationError
from rest_framework import serializers
from wagtail import blocks
from wagtail.documents import get_document_model
from wagtail.documents.blocks import DocumentChooserBlock
from wagtail.images import get_image_model
from wagtail.images.blocks import ImageChooserBlock
from wagtail.models import Page
from wagtail.rich_text import expand_db_html

Image = get_image_model()
Document = get_document_model()


class SerializableBlockMixin:
    serializer_class = None

    def get_api_representation(self, value, context=None):
        if value is not None:
            return self.serializer_class(context=context).to_representation(value)


class APIPageAbsoluteURLSerializer(serializers.Serializer):
    def to_representation(self, value):
        return value.url


class CustomImageSerializer(serializers.HyperlinkedModelSerializer):
    type = serializers.ReadOnlyField(default="image")
    url = serializers.SerializerMethodField()
    alt = serializers.CharField(source="title")

    class Meta:
        model = Image
        fields = ["type", "alt", "url"]

    def get_url(self, obj):
        return self.context["request"].build_absolute_uri(obj.file.url)


class CustomDocumentSerializer(serializers.HyperlinkedModelSerializer):
    type = serializers.ReadOnlyField(default="document")
    url = serializers.SerializerMethodField()
    alt = serializers.CharField(source="title")

    class Meta:
        model = Document
        fields = ["type", "alt", "url"]

    def get_url(self, obj):
        return self.context["request"].build_absolute_uri(obj.file.url)


class APIPageChooserBlock(SerializableBlockMixin, blocks.PageChooserBlock):
    serializer_class = APIPageAbsoluteURLSerializer


class APIImageChooserBlock(SerializableBlockMixin, ImageChooserBlock):
    serializer_class = CustomImageSerializer


class APIDocumentChooserBlock(SerializableBlockMixin, DocumentChooserBlock):
    serializer_class = CustomDocumentSerializer


class APIRichTextBlock(blocks.RichTextBlock):
    def get_api_representation(self, *args, **kwargs):
        result = super().get_api_representation(*args, **kwargs)
        return expand_db_html(result)

    class Meta:
        icon = "pilcrow"
        label = "Контент"


class URLChooserBlock(blocks.StreamBlock):
    char_url = blocks.CharBlock(label="URL")
    url = blocks.URLBlock(
        label="Абсолютный URL", help_text="Должен начинаться с https://"
    )
    page = APIPageChooserBlock(label="Страница")

    def get_api_representation(self, value, context=None):
        result = super().get_api_representation(value, context)
        return result[0]["value"] if result else None

    class Meta:
        label = "Ссылка"
        icon = "link"
        max_num = 1


class LinkBlock(blocks.StructBlock):
    label = blocks.CharBlock(label="Название ссылки", required=False)
    url = URLChooserBlock()
    in_new_tab = blocks.BooleanBlock(
        default=False, required=False, label="Открывать в новой вкладке"
    )

    def __init__(self, *args, required=True, **kwargs):
        kwargs["required"] = required
        super().__init__(*args, **kwargs)

        self._required = required
        self._patch_required_url()

    @staticmethod
    def get_page_title(page_block) -> str:
        try:
            page = Page.objects.get(pk=page_block.raw_data[0]["value"])
            return page.title
        except Page.DoesNotExist:
            logging.warning("Broken page")
            return "Ссылка"

    @staticmethod
    def get_label_block(value) -> str:
        for block_type, block_value in value.items():
            if block_type == "label":
                return block_value

    @staticmethod
    def get_page_block(value):
        for block_type, block_value in value.items():
            try:
                if block_type == "url" and block_value.raw_data[0]["type"] == "page":
                    return block_value
            except (IndexError, KeyError):
                pass
        return None

    def get_new_label(self, value):
        if page_block := self.get_page_block(value):
            return self.get_page_title(page_block)

    def get_api_representation(self, value, context=None):
        result = super().get_api_representation(value, context)

        if not result["label"] and not result["url"]:
            return None

        if not result["label"]:
            result["label"] = self.get_new_label(value)

        return result

    def _patch_required_url(self):
        if self._required is False:
            self.child_blocks["url"].meta.required = False

    def clean(self, value):
        # label можно не заполнять только если выбран page
        # пропускаем проверку есть self.required=False и поля пустые
        if not self._required and not (value["label"] or value["url"]):
            return super().clean(value)

        if not self.get_page_block(value) and not self.get_label_block(value):
            raise blocks.struct_block.StructBlockValidationError(
                {
                    "label": ValidationError(
                        "Нужно заполнить или выбрать тип ссылки - 'Страница'"
                    ),
                }
            )

        if value["label"] and not value["url"]:
            raise blocks.struct_block.StructBlockValidationError(
                {
                    "url": ValidationError("Необходимо заполнить"),
                }
            )

        return super().clean(value)

    class Meta:
        label = "Ссылка"
        icon = "link"
