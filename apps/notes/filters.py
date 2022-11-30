from django_filters import filters, FilterSet
from notes.models import Note


class NoteFilterSet(FilterSet):
    class Meta:
        model = Note
        fields = (
            'user', 'labels'
        )
