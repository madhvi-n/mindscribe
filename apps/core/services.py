from django.conf import settings
from django.core.mail import send_mail
from django.template import Context, Template

import os


def get_env_variable(var_name):
    try:
        return os.environ[var_name]
    except KeyError:
        error_msg = 'Set the %s environment variable' % var_name
        return None


def mail(subject, email_template, recipient, context):
    auth_user = os.get_env_variable('EMAIL_HOST_USER')
    auth_password = get_env_variable('EMAIL_HOST_PASSWORD')

    with open(settings.STATIC_ROOT + 'templates/emails/' + email_template, 'r') as email_file:
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
            fail_silently=False
        )
