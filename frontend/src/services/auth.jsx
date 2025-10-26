// src/services/auth.jsx
import api from './api'

export const authAPI = {
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register/', userData)
      return response.data
    } catch (error) {
      if (error.response && error.response.data) {
        const errorData = error.response.data
        throw new Error(Object.values(errorData).flat().join(' '))
      }
      throw error
    }
  },

  login: async (email, seedPhrase) => {
    try {
      const response = await api.post('/auth/login/', {
        email,
        seed_phrase: seedPhrase
      })

      if (response.data.requires_2fa) {
        return { requires2FA: true, email }
      }
      
      const { access, refresh, user } = response.data
      localStorage.setItem('access_token', access)
      localStorage.setItem('refresh_token', refresh)
      
      return { user, access, refresh }
    } catch (error) {
      if (error.response && error.response.data) {
        const errorData = error.response.data
        throw new Error(errorData.error || 'Login failed')
      }
      throw error
    }
  },

  verify2FA: async (code) => {
    try {
      const response = await api.post('/auth/verify-2fa/', { code })
      return response.data
    } catch (error) {
      if (error.response && error.response.data) {
        const errorData = error.response.data
        throw new Error(errorData.error || '2FA verification failed')
      }
      throw error
    }
  },

  getProfile: async () => {
    try {
      const response = await api.get('/auth/profile/')
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  getCountries: async () => {
    try {
      const response = await api.get('/auth/countries/')
      return response.data
    } catch (error) {
      console.error('Failed to fetch countries:', error)
      // Return a default or empty array in case of an error
      return []
    }
  },

  logout: () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    window.location.href = '/login'
  }
}

// Named exports
export const registerUser = authAPI.register
export const loginUser = authAPI.login
export const verify2FA = authAPI.verify2FA
export const getProfile = authAPI.getProfile
export const logoutUser = authAPI.logout
export const getCountries = authAPI.getCountries

// Default export
export default authAPI