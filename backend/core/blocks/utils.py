import logging
import re
from pathlib import Path

import requests
from django.conf import settings
from pdf2image.exceptions import PDFPopplerTimeoutError, PDFSyntaxError
from wagtail.documents.models import Document
from wagtail.images import get_image_model
from wagtail.models import Collection
from pdf2image import convert_from_path

YOUTUBE_RE_PATTERN = re.compile(
    r'(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})'
)
RUTUBE_RE_PATTERN = re.compile(r"rutube\.ru\/video\/([a-z0-9]+)")

Image = get_image_model()


def norm_path(path: Path | str) -> str:
    if isinstance(path, Path):
        path = str(path)
    return path.replace(str(settings.MEDIA_ROOT) + "/", "")


def get_youtube_id(value):
    try:
        return re.findall(YOUTUBE_RE_PATTERN, value)[0]
    except IndexError:
        return ""


def get_rutube_id(value: str) -> str:
    try:
        return re.findall(RUTUBE_RE_PATTERN, value)[0]
    except IndexError:
        return ""


def get_cover_folder() -> Path:
    folder = settings.YOUTUBE_COVERS_ROOT
    if not folder.exists() or not folder.is_dir():
        folder.mkdir()
    return folder


def get_document_cover_folder() -> Path:
    folder = settings.DOCUMENT_COVERS_ROOT
    if not folder.exists() or not folder.is_dir():
        folder.mkdir()
    return folder


def get_collection(name) -> Collection:
    try:
        collection = Collection.objects.get(name=name)
    except Collection.DoesNotExist:
        collection = Collection(name=name)
        Collection.objects.first().add_child(instance=collection)
    return collection


def download_youtube_cover(youtube_id) -> Image | None:
    for quality in ["maxresdefault", "sddefault", "hqdefault", "default"]:
        thumbnail_url = f"https://i.ytimg.com/vi/{youtube_id}/{quality}.jpg"
        response = requests.get(thumbnail_url)
        if (
            response.status_code == 200
            and response.headers["Content-Type"] == "image/jpeg"
        ):
            break
    else:
        return None

    filepath = get_cover_folder() / f"{youtube_id}.jpg"
    open(filepath, "wb").write(response.content)
    collection = get_collection("youtube")

    image = Image.objects.create(
        title=youtube_id, file=norm_path(filepath), collection=collection
    )
    return image


def youtube_cover(iframe_code: str) -> Image | None:
    if not iframe_code:
        return None

    youtube_id = get_youtube_id(iframe_code)
    if not youtube_id:
        return None

    image = Image.objects.filter(title=youtube_id).first()
    if not image:
        image = download_youtube_cover(youtube_id)

    return image


def make_iframe(url_or_iframe: str | None) -> str | None:
    if url_or_iframe is None:
        return None

    if url_or_iframe.startswith("<iframe"):
        return url_or_iframe

    if youtube_id := get_youtube_id(url_or_iframe):
        return f'<iframe width="560" height="315" src="https://www.youtube.com/embed/{youtube_id}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'

    if rutube_id := get_rutube_id(url_or_iframe):
        return f'<iframe width="720" height="405" src="https://rutube.ru/play/embed/{rutube_id}" frameBorder="0" allow="clipboard-write; autoplay" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>'

    return None


def get_document_thumbnail_name(document: Document) -> str:
    return f"Иконка документа #{document.pk}"


def document_cover(document: Document) -> Image | None:
    if document.content_type != "application/pdf":
        return None

    try:
        thumbnails = convert_from_path(document.file.path, last_page=1)
    except (PDFPopplerTimeoutError, PDFSyntaxError) as err:
        logging.error(
            "Unable to generate thumbnail for document %d: %s", document.pk, err
        )
        return None

    filepath = get_document_cover_folder() / f"{document.pk}.jpg"
    thumbnails[0].save(filepath)

    collection = get_collection("Превью документов")
    image_title = get_document_thumbnail_name(document)
    image = Image.objects.create(
        title=image_title, file=norm_path(filepath), collection=collection
    )

    return image


def document_thumbnail(document: Document):
    thumbnail_name = get_document_thumbnail_name(document)
    image = Image.objects.filter(title=thumbnail_name).first()
    if not image:
        image = document_cover(document)
    return image
