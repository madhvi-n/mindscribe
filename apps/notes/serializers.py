from rest_framework import serializers
from profiles.serializers import UserSerializer, UserReadOnlySerializer
from notes.models import Note
from labels.serializers import LabelSerializer, LabelReadOnlySerializer


class NoteCreateSerializer(serializers.ModelSerializer):
    collaborators = UserSerializer(many=True, required=False)
    labels = LabelSerializer(many=True, required=False)

    class Meta:
        model = Note
        fields = (
            'id', 'title', 'content', 'color', 'collaborators',
            'is_pinned', 'is_archived', 'user', 'labels'
        )
        read_only_fields = ('id', 'collaborators', 'labels')

    def create(self, validated_data):
        note = Note.objects.create(**validated_data)
        return note

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.content = validated_data.get('content', instance.content)
        instance.save()
        return instance


class NoteSerializer(serializers.ModelSerializer):
    collaborators = UserSerializer(many=True, required=False)
    labels = LabelReadOnlySerializer(many=True, required=False)

    class Meta:
        model = Note
        fields = (
            'id', 'title', 'content', 'color', 'is_pinned',
            'user', 'collaborators', 'labels',
            'is_archived', 'is_edited', 'created_at',
        )
