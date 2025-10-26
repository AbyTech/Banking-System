import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './hooks/useAuth';
import AuthLayout from './components/Layout/AuthLayout';
import MainLayout from './components/Layout/MainLayout';

// Auth Pages
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import TwoFA from './pages/Auth/TwoFA';

// Main Pages
import Dashboard from './pages/Dashboard/Dashboard';
import Transactions from './pages/Transactions/Transactions';
import Cards from './pages/Cards/Cards';
import Loans from './pages/Loans/Loans';
import Profile from './pages/Profile/Profile';
import Support from './pages/Support/Support';
import AdminDashboard from './pages/Admin/AdminDashboard';

import './styles/index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster
          position="top-right"
          toastOptions={{
            className: 'bg-white dark:bg-primary-800 text-primary-900 dark:text-cream border border-silver/20',
            duration: 4000,
          }}
        />
        <Routes>
          {/* Auth Routes */}
          <Route
            path="/register"
            element={<AuthLayout><Register /></AuthLayout>}
          />
          <Route
            path="/login"
            element={<AuthLayout><Login /></AuthLayout>}
          />
          <Route
            path="/twofa"
            element={<AuthLayout><TwoFA /></AuthLayout>}
          />

          {/* Main Routes */}
          <Route
            path="/dashboard"
            element={<MainLayout><Dashboard /></MainLayout>}
          />
          <Route
            path="/transactions"
            element={<MainLayout><Transactions /></MainLayout>}
          />
          <Route
            path="/cards"
            element={<MainLayout><Cards /></MainLayout>}
          />
          <Route
            path="/loans"
            element={<MainLayout><Loans /></MainLayout>}
          />
          <Route
            path="/profile"
            element={<MainLayout><Profile /></MainLayout>}
          />
          <Route
            path="/support"
            element={<MainLayout><Support /></MainLayout>}
          />
          <Route
            path="/admin"
            element={<MainLayout><AdminDashboard /></MainLayout>}
          />

          {/* Default Route */}
          <Route
            path="/"
            element={<AuthLayout><Register /></AuthLayout>}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;