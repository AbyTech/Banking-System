import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  TrendingDown,
  CreditCard,
  DollarSign,
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  Send
} from 'lucide-react'
import Card, { CardContent, CardHeader } from '../../components/UI/Card'
import Button from '../../components/UI/Button'
import QuickActions from './QuickActions'
import ActivityFeed from './ActivityFeed'
import BalanceChart from '../../components/Charts/BalanceChart'
import { useAuth } from '../../hooks/useAuth'
import api from '../../services/api'

const Dashboard = () => {
  const { user } = useAuth()
  const [balance, setBalance] = useState(user?.balance || 0)
  const [currency, setCurrency] = useState(user?.currency_code || 'USD')
  const [stats, setStats] = useState([])
  const [recentTransactions, setRecentTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchDashboardData()
    }
  }, [user])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      // Fetch account data
      const accountResponse = await api.get('/bank/account/')
      const accountData = accountResponse.data
      setBalance(accountData.current_balance)

      // Fetch transactions
      const transactionsResponse = await api.get('/bank/transactions/')
      setRecentTransactions(transactionsResponse.data.slice(0, 3))

      // Fetch cards count
      const cardsResponse = await api.get('/cards/cards/')
      const activeCards = cardsResponse.data.filter(card => card.purchase_status === 'active').length

      // Fetch loans count
      const loansResponse = await api.get('/loans/loans/')
      const activeLoans = loansResponse.data.filter(loan => loan.status === 'active').length

      // Calculate stats
      const monthlyIncome = transactionsResponse.data
        .filter(t => t.transaction_type === 'deposit' && new Date(t.timestamp).getMonth() === new Date().getMonth())
        .reduce((sum, t) => sum + parseFloat(t.amount), 0)

      const monthlyExpenses = transactionsResponse.data
        .filter(t => ['withdrawal', 'transfer', 'payment', 'card_purchase'].includes(t.transaction_type) &&
                     new Date(t.timestamp).getMonth() === new Date().getMonth())
        .reduce((sum, t) => sum + parseFloat(t.amount), 0)

      setStats([
        {
          title: 'Total Balance',
          value: `$${accountData.current_balance.toLocaleString()}`,
          change: '+12.5%',
          trend: 'up',
          icon: DollarSign,
          color: 'text-success'
        },
        {
          title: 'Monthly Income',
          value: `$${monthlyIncome.toFixed(2)}`,
          change: '+5.2%',
          trend: 'up',
          icon: TrendingUp,
          color: 'text-success'
        },
        {
          title: 'Monthly Expenses',
          value: `$${monthlyExpenses.toFixed(2)}`,
          change: '-2.1%',
          trend: 'down',
          icon: TrendingDown,
          color: 'text-danger'
        },
        {
          title: 'Active Cards',
          value: activeCards.toString(),
          change: '+1',
          trend: 'up',
          icon: CreditCard,
          color: 'text-gold'
        }
      ])
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
      // Fallback to default stats if API fails
      setStats([
        {
          title: 'Total Balance',
          value: `$${balance.toLocaleString()}`,
          change: '+12.5%',
          trend: 'up',
          icon: DollarSign,
          color: 'text-success'
        },
        {
          title: 'Monthly Income',
          value: '$0.00',
          change: '+5.2%',
          trend: 'up',
          icon: TrendingUp,
          color: 'text-success'
        },
        {
          title: 'Monthly Expenses',
          value: '$0.00',
          change: '-2.1%',
          trend: 'down',
          icon: TrendingDown,
          color: 'text-danger'
        },
        {
          title: 'Active Cards',
          value: '0',
          change: '+1',
          trend: 'up',
          icon: CreditCard,
          color: 'text-gold'
        }
      ])
    } finally {
      setLoading(false)
    }
  }



  return (
    <div className="min-h-screen bg-cream dark:bg-primary-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-heading font-bold text-primary dark:text-cream mb-2">
            Welcome back, {user?.first_name || 'User'}! 👋
          </h1>
          <p className="text-silver dark:text-silver">
            Here's your financial overview for today
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-silver dark:text-silver mb-1">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-primary dark:text-cream mb-2">
                        {stat.value}
                      </p>
                      <div className={`flex items-center space-x-1 text-sm ${stat.color}`}>
                        {stat.trend === 'up' ? (
                          <TrendingUp size={16} />
                        ) : (
                          <TrendingDown size={16} />
                        )}
                        <span>{stat.change}</span>
                        <span className="text-silver">from last month</span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-xl bg-gold/10 ${stat.color}`}>
                      <stat.icon size={24} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Balance Chart */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-heading font-semibold text-primary dark:text-cream">
                  Balance Overview
                </h3>
              </CardHeader>
              <CardContent>
                <BalanceChart />
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <QuickActions />
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-heading font-semibold text-primary dark:text-cream">
                Recent Transactions
              </h3>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <motion.div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-cream dark:bg-primary-700/50 hover:bg-silver/10 transition-colors"
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-full ${
                        transaction.amount > 0 
                          ? 'bg-success/20 text-success' 
                          : 'bg-danger/20 text-danger'
                      }`}>
                        {transaction.amount > 0 ? (
                          <ArrowDownLeft size={20} />
                        ) : (
                          <ArrowUpRight size={20} />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-primary dark:text-cream">
                          {transaction.description}
                        </p>
                        <p className="text-sm text-silver">
                          {new Date(transaction.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        transaction.amount > 0 ? 'text-success' : 'text-danger'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                      </p>
                      <p className="text-xs text-silver capitalize">
                        {transaction.status}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Feed */}
        <div className="mt-8">
          <ActivityFeed />
        </div>
      </div>
    </div>
  )
}

export default Dashboard