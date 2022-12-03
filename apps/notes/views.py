from django.shortcuts import render
from core.views import BaseViewSet
from rest_framework import viewsets, generics, status, filters
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated

from labels.models import Label
from notes.models import Note
from notes.serializers import NoteSerializer, NoteCreateSerializer
from django.contrib.auth.models import User
from notes.filters import NoteFilterSet


class NoteViewSet(BaseViewSet):
    queryset = Note.objects.all().exclude(is_archived=True)
    serializer_class = NoteSerializer
    serializer_action_classes = {
        'create': NoteCreateSerializer,
        'update': NoteCreateSerializer
    }
    permission_class = [IsAuthenticated,]
    filterset_class = NoteFilterSet

    def create(self, request):
        data = request.data
        if not request.user.is_authenticated:
            return Response({'error':'The user is anonymous'}, status=status.HTTP_401_UNAUTHORIZED)
        if data['user'] != request.user.pk:
            return Response({'error': 'Spoofing detected'}, status=status.HTTP_403_FORBIDDEN)

        serializer_class = self.get_serializer_class()
        serializer = serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        note = self.get_object()
        data = request.data
        user = request.user

        if not user.is_authenticated:
            return Response({"error": "User not authorized"}, status=status.HTTP_401_UNAUTHORIZED)

        if note.user != user:
            return Response({"error": "Spoofing detected"}, status=status.HTTP_403_FORBIDDEN)

        serializer_class = self.get_serializer_class()
        serializer = serializer_class(data=data, instance=note)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        note = self.get_object()
        user = request.user
        if not user.is_authenticated:
            return Response({"error": "User not authorized"}, status=status.HTTP_401_UNAUTHORIZED)

        if note.user != user:
            return Response({"error": "Spoofing detected"}, status=status.HTTP_403_FORBIDDEN)

        note.delete()
        return Response({"success": True}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['put'])
    def add_label(self, request, pk=None):
        note = self.get_object()
        user = request.user
        if not user.is_authenticated:
            return Response({"error": "User not authorized"}, status=status.HTTP_401_UNAUTHORIZED)
        if note.user != user:
            return Response({"error": "Spoofing detected"}, status=status.HTTP_403_FORBIDDEN)
        try:
            label = data.pop('label', None)
            label_obj = None
            if 'id' in label.keys():
                label_obj = Label.objects.get(pk=label['id'])
            else:
                label_obj, created = Label.objects.get_or_create(name=label['name'], user=user)
            if label_obj is not None and label_obj not in note.labels.all():
                note.labels.add(label_obj)
        except Exception as e:
            return Response({"error": str(e), "message": e.message}, status=status.HTTP_400_BAD_REQUEST)
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(label_obj)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['put'])
    def remove_label(self, request, pk=None):
        note = self.get_object()
        user = request.user
        if not user.is_authenticated:
            return Response({"error": "User not authorized"}, status=status.HTTP_401_UNAUTHORIZED)

        if note.user != user:
            return Response({"error": "Spoofing detected"}, status=status.HTTP_403_FORBIDDEN)
        try:
            label = data.pop('label', None)
            label_obj = None
            if 'id' in label.keys():
                label_obj = Label.objects.get(pk=label['id'], user=user)
            if label_obj is not None and label_obj in note.labels.all():
                note.labels.remove(label_obj)
        except Exception as e:
            return Response({"error": str(e), "message": e.message}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"success": True}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['put'])
    def toggle_pinned(self, request, pk=None):
        user = request.user
        note = self.get_object()
        if not user.is_authenticated:
            return Response({"error": "User not authorized"}, status=status.HTTP_401_UNAUTHORIZED)
        if note.user != user:
            return Response({"error": "Spoofing detected"}, status=status.HTTP_403_FORBIDDEN)
        note = self.get_object()
        note.is_pinned = not note.is_pinned
        note.save()
        return Response({"success": True}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['put'])
    def toggle_archived(self, request, pk=None):
        user = request.user
        note = self.get_object()
        if not user.is_authenticated:
            return Response({"error": "User not authorized"}, status=status.HTTP_401_UNAUTHORIZED)
        if note.user != user:
            return Response({"error": "Spoofing detected"}, status=status.HTTP_403_FORBIDDEN)
        note.is_archived = not note.is_archived
        note.save()
        return Response({"success": True}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['put'])
    def change_color(self, request, pk=None):
        user = request.user
        note = self.get_object()
        if not user.is_authenticated:
            return Response({"error": "User not authorized"}, status=status.HTTP_401_UNAUTHORIZED)
        if note.user != user:
            return Response({"error": "Spoofing detected"}, status=status.HTTP_403_FORBIDDEN)
        try:
            data = request.data
            note = self.get_object()
            note.color = data['color']
            note.save()
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"success": True}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['put'])
    def add_collaborator(self, request, pk=None):
        note = self.get_object()
        user = request.user
        if not user.is_authenticated:
            return Response({"error": "User not authorized"}, status=status.HTTP_401_UNAUTHORIZED)
        if note.user != user:
            return Response({"error": "Spoofing detected"}, status=status.HTTP_403_FORBIDDEN)
        try:
            data = request.data
            collaborator_id = data.pop('collaborator', None)
            collaborator = User.objects.get(pk=collaborator_id)
            if collaborator is not None and collaborator not in note.collaborators.all():
                note.collaborators.add(collaborator)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(note)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['put'])
    def remove_collaborator(self, request, pk=None):
        note = self.get_object()
        user = request.user
        if not user.is_authenticated:
            return Response({"error": "User not authorized"}, status=status.HTTP_401_UNAUTHORIZED)
        if note.user != user:
            return Response({"error": "Spoofing detected"}, status=status.HTTP_403_FORBIDDEN)
        try:
            data = request.data
            collaborator_id = data.pop('collaborator', None)
            collaborator = User.objects.get(pk=collaborator_id)
            if collaborator is not None and collaborator not in note.collaborators.all():
                note.collaborators.remove(collaborator)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(collaborator)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False)
    def archived(self, request, pk=None):
        user = request.user
        if not user.is_authenticated:
            return Response({"error": "User not authorized"}, status=status.HTTP_401_UNAUTHORIZED)
        serializer_class = self.get_serializer_class()
        queryset = Note.objects.filter(is_archived=True)
        serializer = serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False)
    def colors(self, request, pk=None):
        return Response({"colors": dict(Note.Color.choices).values()}, status=status.HTTP_200_OK)
