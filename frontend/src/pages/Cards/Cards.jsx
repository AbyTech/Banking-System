import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, Plus, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react'
import Card, { CardContent, CardHeader } from '../../components/UI/Card'
import Button from '../../components/UI/Button'
import Modal from '../../components/UI/Modal'
import { useAuth } from '../../hooks/useAuth'
import api from '../../services/api'

const Cards = () => {
  const { user } = useAuth()
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentForm, setPaymentForm] = useState({
    cardType: 'virtual',
    amount: 25.00
  })

  useEffect(() => {
    if (user) {
      fetchCards()
    }
  }, [user])

  const fetchCards = async () => {
    try {
      setLoading(true)
      const response = await api.get('/cards/cards/')
      setCards(response.data)
    } catch (error) {
      console.error('Failed to fetch cards:', error)
      setCards([])
    } finally {
      setLoading(false)
    }
  }

  const handleOrderCard = () => {
    setShowPaymentModal(true)
  }

  const handlePaymentSubmit = async (e) => {
    e.preventDefault()
    try {
      // Submit card order to backend
      const response = await api.post('/cards/order-card/', {
        card_type: paymentForm.cardType,
        amount: paymentForm.amount
      })

      // Refresh cards list
      fetchCards()
      setShowPaymentModal(false)
      setPaymentForm({ cardType: 'virtual', amount: 25.00 })
    } catch (error) {
      console.error('Failed to order card:', error)
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="text-success" size={16} />
      case 'pending_payment':
        return <Clock className="text-gold" size={16} />
      case 'expired':
        return <XCircle className="text-danger" size={16} />
      default:
        return <AlertTriangle className="text-silver" size={16} />
    }
  }

  const getTimeUntilDeadline = (deadline) => {
    const now = new Date()
    const deadlineDate = new Date(deadline)
    const diff = deadlineDate - now
    
    if (diff <= 0) return 'Overdue'
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    
    return `${days}d ${hours}h`
  }

  return (
    <div className="min-h-screen bg-cream dark:bg-primary-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-heading font-bold text-primary dark:text-cream mb-2">
            Cards
          </h1>
          <p className="text-silver dark:text-silver">
            Manage your virtual and physical cards
          </p>
        </motion.div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-heading font-semibold text-primary dark:text-cream">
            Your Cards
          </h2>
          <Button variant="primary" className="flex items-center space-x-2" onClick={handleOrderCard}>
            <Plus size={20} />
            <span>Order New Card</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-primary dark:text-cream">
                        {card.cardName}
                      </h3>
                      <p className="text-silver text-sm capitalize">
                        {card.type} Card
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(card.status)}
                      <span className={`text-sm capitalize ${
                        card.status === 'active' ? 'text-success' : 
                        card.status === 'pending_payment' ? 'text-gold' : 'text-danger'
                      }`}>
                        {card.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-primary to-primary-600 rounded-xl p-4 text-white mb-4">
                    <div className="flex justify-between items-center mb-4">
                      <CreditCard size={24} />
                      <span className="text-sm">{card.type.toUpperCase()}</span>
                    </div>
                    <p className="text-xl font-mono tracking-wider mb-2">
                      {card.cardNumber}
                    </p>
                    <div className="flex justify-between text-sm">
                      <span>EXPIRES</span>
                      <span>{card.expiryDate}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-silver">CVV</span>
                      <span className="text-primary dark:text-cream">{card.cvv}</span>
                    </div>
                    {card.purchaseStatus === 'pending_payment' && (
                      <div className="flex justify-between">
                        <span className="text-silver">Payment Due</span>
                        <span className="text-gold font-semibold">
                          {getTimeUntilDeadline(card.paymentDeadline)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex space-x-3">
                    <Button variant="primary" size="sm" className="flex-1">
                      Details
                    </Button>
                    {card.purchaseStatus === 'pending_payment' && (
                      <Button variant="danger" size="sm" className="flex-1">
                        Pay Now
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Card Statistics */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-heading font-semibold text-primary dark:text-cream">
                Card Statistics
              </h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-primary-50 dark:bg-primary-700 rounded-xl">
                  <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CreditCard className="text-gold" size={24} />
                  </div>
                  <h4 className="font-semibold text-primary dark:text-cream">Total Cards</h4>
                  <p className="text-2xl font-bold text-gold">{cards.length}</p>
                </div>

                <div className="text-center p-4 bg-primary-50 dark:bg-primary-700 rounded-xl">
                  <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="text-success" size={24} />
                  </div>
                  <h4 className="font-semibold text-primary dark:text-cream">Active Cards</h4>
                  <p className="text-2xl font-bold text-success">{cards.filter(card => card.status === 'active').length}</p>
                </div>

                <div className="text-center p-4 bg-primary-50 dark:bg-primary-700 rounded-xl">
                  <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="text-gold" size={24} />
                  </div>
                  <h4 className="font-semibold text-primary dark:text-cream">Pending Payments</h4>
                  <p className="text-2xl font-bold text-gold">{cards.filter(card => card.purchaseStatus === 'pending_payment').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Modal */}
        <Modal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          title="Order New Card"
        >
          <form onSubmit={handlePaymentSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-primary dark:text-cream mb-2">
                Card Type
              </label>
              <select
                value={paymentForm.cardType}
                onChange={(e) => setPaymentForm({ ...paymentForm, cardType: e.target.value })}
                className="w-full px-4 py-3 bg-cream dark:bg-primary-700 border border-silver dark:border-primary-600 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent"
              >
                <option value="virtual">Virtual Card - $25.00</option>
                <option value="physical">Physical Card - $50.00</option>
              </select>
            </div>

            <div className="bg-primary-50 dark:bg-primary-700 rounded-xl p-4">
              <h4 className="font-semibold text-primary dark:text-cream mb-2">
                Order Summary
              </h4>
              <div className="text-sm text-silver space-y-1">
                <div className="flex justify-between">
                  <span>{paymentForm.cardType === 'virtual' ? 'Virtual Card' : 'Physical Card'}</span>
                  <span className="text-primary dark:text-cream">${paymentForm.amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Processing Fee</span>
                  <span className="text-primary dark:text-cream">$2.50</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-primary dark:text-cream">${(paymentForm.amount + 2.50).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowPaymentModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="flex-1"
              >
                Pay ${(paymentForm.amount + 2.50).toFixed(2)}
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  )
}

export default Cards
