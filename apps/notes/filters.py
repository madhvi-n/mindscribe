from notes.models import Note
import django_filters


class NoteFilterSet(django_filters.rest_framework.FilterSet):
    class Meta:
        model = Note
        fields = (
            "user",
            "labels__name",
            "is_pinned",
            "is_archived",
        )
