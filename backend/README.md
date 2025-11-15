# Primewave Bank - Global Banking System

A luxurious, secure, and feature-rich global banking web application built with React.js + Tailwind CSS frontend and Django + Django REST Framework backend.

## 🚀 Features

### 🔐 Security
- **Seed Phrase Authentication** - 12-word BIP39 mnemonic for secure access
- **Two-Factor Authentication (2FA)** - Email OTP verification
- **JWT-based Authentication** - Secure token management
- **Role-based Access Control** - Customer, Support, Admin roles

### 💰 Banking Features
- **Multi-currency Support** - Country-based currency display
- **Real-time Transactions** - Live balance updates via WebSockets
- **Card Management** - Virtual/physical cards with payment deadlines
- **Loan System** - Application and approval workflow
- **Transaction History** - Filterable and searchable

### 🎨 User Experience
- **Luxurious Design** - Premium banking aesthetic
- **Mobile-Responsive** - Optimized for all devices
- **Dark/Light Mode** - Theme switching
- **PWA Support** - Installable web app
- **Smooth Animations** - Framer Motion transitions

### 📊 Admin Features
- **User Management** - Complete user control
- **Loan Approvals** - Review and approve/reject loans
- **Analytics Dashboard** - Charts and statistics
- **Real-time Monitoring** - Live system monitoring

## 🛠️ Tech Stack

### Frontend
- React.js 18
- Tailwind CSS
- Framer Motion (animations)
- Recharts (analytics)
- Axios (API client)
- React Router (navigation)

### Backend
- Django 4.2
- Django REST Framework
- Django Channels (WebSockets)
- Celery (task queue)
- PostgreSQL (database)
- Redis (cache & message broker)

## 🏁 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.11+
- PostgreSQL
- Redis

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend