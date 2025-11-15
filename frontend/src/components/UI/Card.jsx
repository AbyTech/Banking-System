import React from 'react'
import { motion } from 'framer-motion'

const Card = ({ children, className = '', hover = false, glass = false }) => {
  return (
    <motion.div
      className={`
        bg-white dark:bg-primary-800 rounded-2xl shadow-lux-card border border-silver/20 dark:border-primary-700
        ${glass ? 'backdrop-blur-lg bg-white/80 dark:bg-primary-800/80' : ''}
        ${hover ? 'hover:shadow-xl transition-shadow duration-300' : ''}
        ${className}
      `}
      whileHover={hover ? { y: -2 } : {}}
    >
      {children}
    </motion.div>
  )
}

export const CardHeader = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-b border-silver/20 dark:border-primary-700 ${className}`}>
    {children}
  </div>
)

export const CardContent = ({ children, className = '' }) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
)

export const CardFooter = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-t border-silver/20 dark:border-primary-700 ${className}`}>
    {children}
  </div>
)

export default Card