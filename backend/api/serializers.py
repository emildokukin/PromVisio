from rest_framework import serializers

from core.models import Feedback


class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = [
            "subject",
            "message",
            "phone_number",
            "email",
        ]
