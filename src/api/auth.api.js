import api from './axios.js'

export const authAPI = {
  // Register new user
  register: async (userData) => {
    try {
      const response = await api.post('/api/register', userData)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post('/api/login', credentials)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Get current user profile
  getProfile: async () => {
    try {
      const response = await api.get('/api/profile')
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Update user profile
  updateProfile: async (userData) => {
    try {
      const response = await api.put('/api/profile', userData)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },

  // Logout (client-side only)
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  // Verify token
  verifyToken: async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return null
      
      const response = await api.get('/api/verify')
      return response.data
    } catch (error) {
      return null
    }
  }
}