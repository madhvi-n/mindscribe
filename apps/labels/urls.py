from django.urls import include, path
from labels.router import router

urlpatterns = [
    path("api/v1/", include(router.urls)),
]
