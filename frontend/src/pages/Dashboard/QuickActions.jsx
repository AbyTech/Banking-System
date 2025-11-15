import React from 'react'
import { motion } from 'framer-motion'
import { 
  Send, 
  Plus, 
  CreditCard, 
  Download,
  Upload,
  Shield,
  History
} from 'lucide-react'
import Card, { CardContent, CardHeader } from '../../components/UI/Card'
import Button from '../../components/UI/Button'

const QuickActions = () => {
  const actions = [
    {
      icon: Send,
      label: 'Send Money',
      description: 'Transfer to anyone',
      color: 'from-blue-500 to-cyan-500',
      href: '/transactions'
    },
    {
      icon: Plus,
      label: 'Add Money',
      description: 'Deposit funds',
      color: 'from-green-500 to-emerald-500',
      href: '/transactions'
    },
    {
      icon: CreditCard,
      label: 'Cards',
      description: 'Manage cards',
      color: 'from-gold to-gold-400',
      href: '/cards'
    },
    {
      icon: Download,
      label: 'Withdraw',
      description: 'Cash out',
      color: 'from-purple-500 to-pink-500',
      href: '/transactions'
    },
    {
      icon: Shield,
      label: 'Security',
      description: 'Protect account',
      color: 'from-red-500 to-orange-500',
      href: '/profile'
    },
    {
      icon: History,
      label: 'History',
      description: 'View transactions',
      color: 'from-gray-500 to-silver',
      href: '/transactions'
    }
  ]

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-heading font-semibold text-primary dark:text-cream">
          Quick Actions
        </h3>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {actions.map((action, index) => (
            <motion.div
              key={action.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                className="w-full h-20 flex flex-col items-center justify-center space-y-2 bg-cream dark:bg-primary-700 hover:bg-silver/20 transition-all"
                onClick={() => window.location.href = action.href}
              >
                <div className={`p-2 rounded-xl bg-gradient-to-r ${action.color} text-white`}>
                  <action.icon size={20} />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-primary dark:text-cream">
                    {action.label}
                  </p>
                  <p className="text-xs text-silver">
                    {action.description}
                  </p>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default QuickActions