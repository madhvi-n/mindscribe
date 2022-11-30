from rest_framework import serializers
from labels.models import Label
from core.serializers import ModelReadOnlySerializer


class LabelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Label
        fields = ('id', 'name', 'user')
        read_only_fields = ('id',)


class LabelReadOnlySerializer(ModelReadOnlySerializer):
    class Meta:
        model = Label
        fields = ('id', 'name')
