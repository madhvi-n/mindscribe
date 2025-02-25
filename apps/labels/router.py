from rest_framework_nested import routers
from labels.views import LabelViewSet

router = routers.SimpleRouter()
router.register("labels", LabelViewSet)
