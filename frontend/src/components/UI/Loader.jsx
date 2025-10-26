import React from 'react'
import { motion } from 'framer-motion'

const Loader = ({ size = 'md', color = 'gold' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  const colorClasses = {
    gold: 'border-gold border-t-transparent',
    primary: 'border-primary dark:border-cream border-t-transparent',
    white: 'border-white border-t-transparent'
  }

  return (
    <motion.div
      className={`${sizeClasses[size]} border-2 ${colorClasses[color]} rounded-full animate-spin`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    />
  )
}

export const PageLoader = () => {
  return (
    <div className="min-h-screen bg-cream dark:bg-primary-900 flex items-center justify-center">
      <div className="text-center">
        <Loader size="xl" />
        <p className="mt-4 text-primary dark:text-cream font-semibold">
          Loading Primewave Bank...
        </p>
      </div>
    </div>
  )
}

export default Loader