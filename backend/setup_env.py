import secrets
from django.core.management.utils import get_random_secret_key

def generate_env_file():
    django_secret = get_random_secret_key()
    jwt_secret = secrets.token_urlsafe(50)
    
    env_content = f"""# Django
SECRET_KEY={django_secret}
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1,.railway.app,.vercel.app

# Database - UPDATE WITH YOUR DATABASE URL
DATABASE_URL=postgres://primewave:primewave@localhost:5432/primewave_bank

# Redis
REDIS_URL=redis://localhost:6379

# Email (SendGrid) - UPDATE WITH YOUR SENDGRID API KEY
SENDGRID_API_KEY=your-sendgrid-api-key-here
DEFAULT_FROM_EMAIL=noreply@primewavebank.com

# JWT
JWT_SECRET={jwt_secret}

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# Stripe (optional)
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
"""
    
    with open('.env', 'w') as f:
        f.write(env_content)
    
    print("✅ .env file created successfully!")
    print("🔑 Generated Django Secret Key:", django_secret)
    print("🔑 Generated JWT Secret:", jwt_secret)
    print("\n📝 Next steps:")
    print("1. Set up PostgreSQL database")
    print("2. Update DATABASE_URL with your actual database connection")
    print("3. Get SendGrid API key from https://sendgrid.com/")
    print("4. Update SENDGRID_API_KEY in .env file")

if __name__ == "__main__":
    generate_env_file()