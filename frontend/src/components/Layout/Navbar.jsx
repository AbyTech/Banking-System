import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  Sun, 
  Moon,
  Bell,
  Settings
} from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Transactions', href: '/transactions' },
    { name: 'Cards', href: '/cards' },
    { name: 'Loans', href: '/loans' },
    { name: 'Support', href: '/support' },
  ]

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <nav className="fixed top-0 w-full bg-white/80 dark:bg-primary-800/80 backdrop-blur-lg border-b border-silver/30 dark:border-primary-700 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-gold to-gold-400 rounded-xl flex items-center justify-center">
              <span className="text-lg font-heading font-bold text-primary">P</span>
            </div>
            <div>
              <h1 className="text-xl font-heading font-bold text-primary dark:text-cream">
                Primewave
              </h1>
              <p className="text-xs text-gold font-semibold">BANK</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-lg font-medium transition-all ${
                  location.pathname === item.href
                    ? 'text-gold bg-gold/10 border-b-2 border-gold'
                    : 'text-primary dark:text-cream hover:text-gold dark:hover:text-gold'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 text-primary dark:text-cream hover:text-gold dark:hover:text-gold transition-colors"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button className="p-2 text-primary dark:text-cream hover:text-gold dark:hover:text-gold transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full"></span>
            </button>

            <Link
              to="/profile"
              className="p-2 text-primary dark:text-cream hover:text-gold dark:hover:text-gold transition-colors"
            >
              <User size={20} />
            </Link>

            <button
              onClick={() => navigate('/login')}
              className="bg-gradient-to-r from-gold to-gold-400 text-primary px-4 py-2 rounded-xl font-semibold hover:shadow-lux-gold transition-all"
            >
              Sign Out
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-primary dark:text-cream hover:text-gold transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-primary-800 border-t border-silver/30 dark:border-primary-700"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-lg font-medium transition-all ${
                    location.pathname === item.href
                      ? 'text-gold bg-gold/10'
                      : 'text-primary dark:text-cream hover:text-gold'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="flex items-center space-x-4 pt-4 border-t border-silver/30 dark:border-primary-700">
                <button
                  onClick={toggleDarkMode}
                  className="p-2 text-primary dark:text-cream hover:text-gold transition-colors"
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                // In Navbar.jsx, replace the user section with:
            <Link
                to="/profile"
                className="flex items-center space-x-2 text-primary dark:text-cream hover:text-gold transition-colors"
                >
                <User size={20} />
                <span>My Account</span>
            </Link>
                <button
                  onClick={() => {
                    navigate('/login')
                    setIsOpen(false)
                  }}
                  className="bg-gradient-to-r from-gold to-gold-400 text-primary px-4 py-2 rounded-xl font-semibold"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

export default Navbar