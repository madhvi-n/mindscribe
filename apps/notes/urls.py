from django.urls import include, path
from notes.router import router

urlpatterns = [
    path("api/v1/", include(router.urls)),
]
