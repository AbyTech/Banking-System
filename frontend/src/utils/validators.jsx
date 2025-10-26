export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const validateSeedPhrase = (phrase) => {
  const words = phrase.trim().split(/\s+/)
  return words.length === 12
}

export const validateAmount = (amount) => {
  return !isNaN(amount) && amount > 0
}

export const validatePassword = (password) => {
  return password.length >= 8
}

export const validatePhone = (phone) => {
  const re = /^\+?[\d\s-()]{10,}$/
  return re.test(phone)
}