# settings.py
import os

# ALLOWED_HOSTS = ['127.0.0.1', 'localhost']
# Get the Render external URL from environment variable, fallback to localhost for local dev
RENDER_EXTERNAL_URL = os.environ.get('RENDER_EXTERNAL_URL')
ALLOWED_HOSTS = [host.strip() for host in os.environ.get('ALLOWED_HOSTS', 'localhost,127.0.0.1').split(',')]
if RENDER_EXTERNAL_URL:
    ALLOWED_HOSTS.append(RENDER_EXTERNAL_URL.replace('https://', '').replace('http://', ''))

# CORS configuration
CORS_ALLOWED_ORIGINS = [origin.strip() for origin in os.environ.get('CORS_ALLOWED_ORIGINS', 'http://localhost:3000,http://127.0.0.1:3000').split(',')]

# Add Render frontend URL if provided
RENDER_FRONTEND_URL = os.environ.get('RENDER_FRONTEND_URL')
if RENDER_FRONTEND_URL:
    CORS_ALLOWED_ORIGINS.append(RENDER_FRONTEND_URL)

CORS_ALLOW_CREDENTIALS = True
