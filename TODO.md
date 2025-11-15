# TODO: Reconfigure for Render Hosting

## Backend Updates
- [x] Update `banking_system/backend/app/core/settings.py` to use environment variables for ALLOWED_HOSTS, CORS_ALLOWED_ORIGINS, and DATABASES configuration.

## Frontend Updates
- [x] Remove `banking_system/frontend/vercel.json` as it's for Vercel, not Render.

## Render Configuration
- [x] Create `banking_system/render.yaml` for Render deployment configuration (web service for backend, static site for frontend).

## Verification
- [x] Ensure Dockerfile and requirements.txt are suitable for Render.
- [x] Updated build script in package.json for cross-platform compatibility.
- [ ] Test build locally if possible (optional).
