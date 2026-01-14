export const tokenUtils = {
  // Get token from localStorage
  getToken: () => {
    return localStorage.getItem('token')
  },

  // Set token in localStorage
  setToken: (token) => {
    localStorage.setItem('token', token)
  },

  // Remove token from localStorage
  removeToken: () => {
    localStorage.removeItem('token')
  },

  // Check if token exists and is valid (basic check)
  isValid: () => {
    const token = localStorage.getItem('token')
    if (!token) return false
    
    try {
      // Basic JWT structure check
      const parts = token.split('.')
      if (parts.length !== 3) return false
      
      // Check if token is expired (simple check without decoding)
      // Note: For proper expiration check, decode the token
      return true
    } catch {
      return false
    }
  },

  // Get payload from token (if you need to decode it)
  getPayload: () => {
    const token = localStorage.getItem('token')
    if (!token) return null
    
    try {
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const payload = JSON.parse(atob(base64))
      return payload
    } catch {
      return null
    }
  },

  // Check if token is about to expire
  isExpiringSoon: (minutes = 5) => {
    const payload = tokenUtils.getPayload()
    if (!payload || !payload.exp) return false
    
    const now = Math.floor(Date.now() / 1000)
    const expiresIn = payload.exp - now
    
    return expiresIn > 0 && expiresIn < (minutes * 60)
  }
}