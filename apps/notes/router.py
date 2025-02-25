from rest_framework_nested import routers
from notes.views import NoteViewSet

router = routers.SimpleRouter()
router.register("notes", NoteViewSet)
