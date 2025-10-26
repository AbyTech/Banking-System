from celery import shared_task
from django.core.mail import send_mail
from django.conf import settings

@shared_task
def send_2fa_email(email, code):
    send_mail(
        'Your Primewave Bank 2FA Code',
        f'Your verification code is: {code}',
        settings.DEFAULT_FROM_EMAIL,
        [email],
        fail_silently=False,
    )