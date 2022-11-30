from django.shortcuts import render
from core.views import BaseViewSet
from labels.models import Label
from labels.serializers import LabelSerializer


class LabelViewSet(BaseViewSet):
    queryset = Label.objects.all()
    serializer_class = LabelSerializer

    def get_queryset(self):
        user = self.request.user
        queryset = self.queryset.filter(user=user)
        return queryset
