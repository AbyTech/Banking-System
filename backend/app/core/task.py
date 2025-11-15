from celery import shared_task
from django.core.mail import send_mail

@shared_task
def debug_task():
    print("Celery is working!")
    return "Success"