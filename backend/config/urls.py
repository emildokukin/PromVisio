from django.conf import settings
from django.http import HttpResponse
from django.urls import include, path
from django.contrib import admin
from drf_spectacular.views import SpectacularSwaggerView, SpectacularAPIView
from haystack.query import SearchQuerySet

from wagtail.admin import urls as wagtailadmin_urls
from wagtail import urls as wagtail_urls
from wagtail.documents import urls as wagtaildocs_urls
from wagtail.models import Page
from wagtail.search.query import Phrase

from core.views import AdminPagePreview

def my_search(request):
    query = request.GET.get("q", "")
    search_results = SearchQuerySet().filter(content=query)
    highlighted = search_results.highlight()

    for result in search_results:
        print(result)
        print(result.search_description)

    return HttpResponse("ok")

urlpatterns = [
    path("search/", my_search),
    path("django-admin/", admin.site.urls),
    path("admin/", include(wagtailadmin_urls)),
    path("documents/", include(wagtaildocs_urls)),
    path("api/", include("api.urls")),
    path("page_preview_admin/", AdminPagePreview.as_view()),
]

if settings.ENABLE_SWAGGER:
    urlpatterns += [
        path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
        path(
            "api/swagger/",
            SpectacularSwaggerView.as_view(url_name="schema"),
            name="swagger-ui",
        ),
    ]

if settings.DEBUG:
    from django.conf.urls.static import static
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns

    # Serve static and media files from development server
    urlpatterns += staticfiles_urlpatterns()
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns = urlpatterns + [
    # For anything not caught by a more specific rule above, hand over to
    # Wagtail's page serving mechanism. This should be the last pattern in
    # the list:
    path("", include(wagtail_urls)),
    # Alternatively, if you want Wagtail pages to be served from a subpath
    # of your site, rather than the site root:
    #    path("pages/", include(wagtail_urls)),
]
