import random
import string
from django.core.mail import send_mail
from django.conf import settings

def generate_2fa_code(length=6):
    return ''.join(random.choices(string.digits, k=length))

def send_2fa_email(email, code):
    subject = 'Your Primewave Bank 2FA Code'
    message = f'Your two-factor authentication code is: {code}'
    send_mail(
        subject,
        message,
        settings.DEFAULT_FROM_EMAIL,
        [email],
        fail_silently=False,
    )