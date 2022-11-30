from django.db import models
from core.models import TimeStampedModel
from django.contrib.auth.models import User
from labels.models import Label


class Note(TimeStampedModel):
    class Color(models.TextChoices):
        INDIANRED = "INDIANRED"
        ORANGE = "ORANGE"
        YELLOW = "YELLOW"
        GREENYELLOW = "GREENYELLOW"
        TURQUOISE = "TURQUOISE"
        LIGHTSKYBLUE = "LIGHTSKYBLUE"
        ROYALBLUE = "ROYALBLUE"
        MISTYROSE = "MISTYROSE"
        VIOLET = "VIOLET"
        HOTPINK = "HOTPINK"
        ROSYBROWN = "ROSYBROWN"
        DARKGRAY = "DARKGRAY"
        WHITE = "WHITE"

    title = models.CharField(max_length=200)
    content = models.TextField(blank=True)
    user = models.ForeignKey(
        User,
        related_name="notes",
        on_delete=models.CASCADE
    )
    collaborators = models.ManyToManyField(
        User, blank=True,
        related_name="collaborators",
    )
    is_pinned = models.BooleanField(default=False)
    is_archived = models.BooleanField(default=False)
    color = models.CharField(
        default="WHITE",
        choices=Color.choices,
        max_length=15
    )
    labels = models.ManyToManyField(
        Label, blank=True,
        related_name="labels",
    )

    class Meta:
        ordering = ['created_at']
        verbose_name = "Note"
        verbose_name_plural = "Notes"

    def __str__(self):
        return f"{self.title}"
