from . import core

HOMEPAGE_BLOCKS = [
    ("team", core.TeamBlock()),
]

GALLERY_BLOCKS = [
    ("photos", core.GalleryPhotosBlock()),
    ("videos", core.GalleryVideosBlock()),
]

ARTICLE_BLOCKS = [("image", core.APIImageChooserBlock(label="Фото"))]
