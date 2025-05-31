from django.db import models
from core.models import TimeStampedModel
from django.contrib.auth.models import User


class Label(TimeStampedModel):
    name = models.CharField(max_length=30)
    user = models.ForeignKey(User, related_name="labels", on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Label"
        verbose_name_plural = "Labels"
        unique_together = ("name", "user")

    def __str__(self):
        return f"{self.name}"
