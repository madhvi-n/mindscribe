from django.contrib import admin
from notes.models import Note


@admin.register(Note)
class NoteAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'title',
        'user',
        'is_pinned',
        'is_archived',
    )
    list_filter = (
        'created_at',
        'updated_at',
        'user',
    )
    raw_id_fields = ('user',)
    filter_horizontal = ['labels', 'collaborators']
    search_fields = ('title', 'content',)
    date_hierarchy = 'created_at'
    fieldsets = (
        ('Note Info', {
            'fields': ('title', 'content', 'user',),
        }),
        ('Labels', {
            'fields': ('labels', 'collaborators',),
        }),
        ('Meta', {
            'fields': ('id', 'is_pinned', 'is_archived', 'color',),
        })
    )
    readonly_fields = ('id',)
