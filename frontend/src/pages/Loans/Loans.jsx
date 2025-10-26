import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Clock, CheckCircle, XCircle, DollarSign } from 'lucide-react'
import Card, { CardContent, CardHeader } from '../../components/UI/Card'
import Button from '../../components/UI/Button'
import Modal from '../../components/UI/Modal'
import { useAuth } from '../../hooks/useAuth'
import api from '../../services/api'

const Loans = () => {
  const { user } = useAuth()
  const [loans, setLoans] = useState([])
  const [showApplication, setShowApplication] = useState(false)
  const [applicationForm, setApplicationForm] = useState({
    amount: '',
    duration: '12',
    purpose: ''
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchLoans()
    }
  }, [user])

  const fetchLoans = async () => {
    try {
      setLoading(true)
      const response = await api.get('/loans/loans/')
      setLoans(response.data)
    } catch (error) {
      console.error('Failed to fetch loans:', error)
      setLoans([])
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="text-success" size={16} />
      case 'pending':
        return <Clock className="text-gold" size={16} />
      case 'rejected':
        return <XCircle className="text-danger" size={16} />
      default:
        return null
    }
  }

  const handleApplicationSubmit = async (e) => {
    e.preventDefault()
    try {
      // Submit loan application to backend
      const response = await api.post('/loans/apply/', {
        amount: parseFloat(applicationForm.amount),
        duration: parseInt(applicationForm.duration),
        purpose: applicationForm.purpose
      })

      // Refresh loans list
      fetchLoans()
      setShowApplication(false)
      setApplicationForm({ amount: '', duration: '12', purpose: '' })
    } catch (error) {
      console.error('Failed to submit loan application:', error)
    }
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
            Loans
          </h1>
          <p className="text-silver dark:text-silver">
            Apply for and manage your loans
          </p>
        </motion.div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-heading font-semibold text-primary dark:text-cream">
            Your Loans
          </h2>
          <Button 
            variant="primary" 
            className="flex items-center space-x-2"
            onClick={() => setShowApplication(true)}
          >
            <TrendingUp size={20} />
            <span>Apply for Loan</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loans.map((loan, index) => (
            <motion.div
              key={loan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-primary dark:text-cream">
                        ${loan.amount.toLocaleString()}
                      </h3>
                      <p className="text-silver text-sm">{loan.duration} months</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(loan.status)}
                      <span className={`text-sm capitalize ${
                        loan.status === 'approved' ? 'text-success' : 
                        loan.status === 'pending' ? 'text-gold' : 'text-danger'
                      }`}>
                        {loan.status}
                      </span>
                    </div>
                  </div>

                  {loan.status === 'approved' && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-silver mb-1">
                        <span>Repayment Progress</span>
                        <span>{loan.repaymentProgress}%</span>
                      </div>
                      <div className="w-full bg-silver/20 rounded-full h-2">
                        <div 
                          className="bg-success h-2 rounded-full" 
                          style={{ width: `${loan.repaymentProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2 text-sm text-silver">
                    <div className="flex justify-between">
                      <span>Interest Rate</span>
                      <span className="text-primary dark:text-cream">{loan.interestRate}%</span>
                    </div>
                    {loan.monthlyPayment && (
                      <div className="flex justify-between">
                        <span>Monthly Payment</span>
                        <span className="text-primary dark:text-cream">${loan.monthlyPayment}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Applied</span>
                      <span>{new Date(loan.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex space-x-3">
                    <Button variant="primary" size="sm" className="flex-1">
                      Details
                    </Button>
                    {loan.status === 'approved' && (
                      <Button variant="secondary" size="sm" className="flex-1">
                        Make Payment
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Loan Application Modal */}
        <Modal
          isOpen={showApplication}
          onClose={() => setShowApplication(false)}
          title="Apply for a Loan"
        >
          <form onSubmit={handleApplicationSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-primary dark:text-cream mb-2">
                Loan Amount
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-silver" size={20} />
                <input
                  type="number"
                  required
                  value={applicationForm.amount}
                  onChange={(e) => setApplicationForm({ ...applicationForm, amount: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-cream dark:bg-primary-700 border border-silver dark:border-primary-600 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent"
                  placeholder="Enter loan amount"
                  min="100"
                  max="50000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary dark:text-cream mb-2">
                Loan Duration
              </label>
              <select
                value={applicationForm.duration}
                onChange={(e) => setApplicationForm({ ...applicationForm, duration: e.target.value })}
                className="w-full px-4 py-3 bg-cream dark:bg-primary-700 border border-silver dark:border-primary-600 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent"
              >
                <option value="6">6 months</option>
                <option value="12">12 months</option>
                <option value="24">24 months</option>
                <option value="36">36 months</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary dark:text-cream mb-2">
                Loan Purpose
              </label>
              <textarea
                value={applicationForm.purpose}
                onChange={(e) => setApplicationForm({ ...applicationForm, purpose: e.target.value })}
                rows="3"
                className="w-full px-4 py-3 bg-cream dark:bg-primary-700 border border-silver dark:border-primary-600 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent"
                placeholder="Describe what you need the loan for..."
              />
            </div>

            <div className="bg-primary-50 dark:bg-primary-700 rounded-xl p-4">
              <h4 className="font-semibold text-primary dark:text-cream mb-2">
                Estimated Terms
              </h4>
              <div className="text-sm text-silver space-y-1">
                <div className="flex justify-between">
                  <span>Interest Rate:</span>
                  <span className="text-primary dark:text-cream">5.5% - 7.5%</span>
                </div>
                <div className="flex justify-between">
                  <span>Processing Time:</span>
                  <span className="text-primary dark:text-cream">1-3 business days</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowApplication(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="flex-1"
              >
                Submit Application
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  )
}

export default Loans