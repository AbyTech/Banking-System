export const currencyFormatter = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

export const currencySymbols = {
  USD: '$',
  GBP: '£',
  EUR: '€',
  NGN: '₦',
  GHS: 'GH₵',
  KES: 'KSh',
  ZAR: 'R'
}

export const getCurrencySymbol = (currencyCode) => {
  return currencySymbols[currencyCode] || '$'
}

export const formatAmount = (amount, currency = 'USD') => {
  const symbol = getCurrencySymbol(currency)
  return `${symbol}${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`
}