from django.conf import settings
from django.core.mail import send_mail
from django.template import Context, Template

from dotenv import load_dotenv
import os


load_dotenv()



def mail(subject, email_template, recipient, context):
    auth_user = os.getenv("EMAIL_HOST_USER")
    auth_password = getenv("EMAIL_HOST_PASSWORD")

    with open(
        settings.STATIC_ROOT + "templates/emails/" + email_template, "r"
    ) as email_file:
        email_template = Template(email_file.read())

        email_body = email_template.render(Context(context))
        recipient_list = []
        recipient_list.append(recipient)

        send_mail(
            subject=subject,
            message=email_body,
            html_message=email_body,
            from_email=auth_user,
            recipient_list=recipient_list,
            auth_user=auth_user,
            auth_password=auth_password,
            fail_silently=False,
        )
