import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area
} from 'recharts'

const BalanceChart = () => {
  const data = [
    { name: 'Jan', balance: 10000 },
    { name: 'Feb', balance: 10500 },
    { name: 'Mar', balance: 11000 },
    { name: 'Apr', balance: 11500 },
    { name: 'May', balance: 12000 },
    { name: 'Jun', balance: 12500 },
    { name: 'Jul', balance: 13000 },
  ]

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-primary-800 p-3 rounded-lg shadow-lux-card border border-silver/20">
          <p className="text-primary dark:text-cream font-semibold">{`${label}`}</p>
          <p className="text-gold">
            {`Balance: $${payload[0].value.toLocaleString()}`}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
          <XAxis 
            dataKey="name" 
            stroke="#6B7280"
            fontSize={12}
          />
          <YAxis 
            stroke="#6B7280"
            fontSize={12}
            tickFormatter={(value) => `$${value / 1000}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="balance" 
            stroke="#d4af37"
            strokeWidth={3}
            dot={{ fill: '#d4af37', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: '#d4af37' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BalanceChart