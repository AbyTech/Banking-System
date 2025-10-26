import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import TwoFAForm from '../../components/Auth/TwoFAForm'
import { authAPI } from '../../services/auth'
import toast from 'react-hot-toast'

const TwoFA = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email || 'your email'

  const handleVerify = async (code) => {
    try {
      await authAPI.verify2FA(code)
      toast.success('Two-factor authentication successful!')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.message || 'Invalid verification code')
      throw error
    }
  }

  const handleResend = async () => {
    // Implement resend logic here
    console.log('Resending code...')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-cream dark:from-primary-900 dark:to-primary-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-primary-800 rounded-2xl shadow-lux-card p-8">
          <TwoFAForm 
            email={email}
            onVerify={handleVerify}
            onResend={handleResend}
          />
        </div>
      </motion.div>
    </div>
  )
}

export default TwoFA