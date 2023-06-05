from wagtail.contrib.modeladmin.helpers import PermissionHelper


class FeedbackPermissionHelper(PermissionHelper):
    def user_can_list(self, user):
        return True

    def user_can_create(self, user):
        return False
