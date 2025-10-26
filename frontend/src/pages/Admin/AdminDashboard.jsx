import React from 'react'
import { motion } from 'framer-motion'
import { Users, CreditCard, TrendingUp, DollarSign } from 'lucide-react'
import Card, { CardContent, CardHeader } from '../../components/UI/Card'
import Button from '../../components/UI/Button'

const AdminDashboard = () => {
  const stats = [
    { title: 'Total Users', value: '1,247', change: '+12%', icon: Users, color: 'text-blue-500' },
    { title: 'Active Cards', value: '892', change: '+5%', icon: CreditCard, color: 'text-gold' },
    { title: 'Transactions', value: '12.4K', change: '+18%', icon: TrendingUp, color: 'text-success' },
    { title: 'Total Revenue', value: '$248K', change: '+23%', icon: DollarSign, color: 'text-purple-500' }
  ]

  return (
    <div className="min-h-screen bg-cream dark:bg-primary-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-primary dark:text-cream">Admin Dashboard</h1>
          <p className="text-silver dark:text-silver">Manage your banking platform</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div key={stat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
              <Card hover><CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div><p className="text-sm text-silver mb-1">{stat.title}</p><p className="text-2xl font-bold text-primary dark:text-cream mb-2">{stat.value}</p><p className="text-sm text-success">{stat.change}</p></div>
                  <div className={`p-3 rounded-xl bg-opacity-20 ${stat.color.replace('text-', 'bg-')}`}><stat.icon className={stat.color} size={24} /></div>
                </div>
              </CardContent></Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default AdminDashboard