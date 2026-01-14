import { useAuth } from '../context/AuthContext.jsx'

export const useAuthHook = () => {
  const {
    user,
    loading,
    error,
    register,
    login,
    logout,
    updateUser,
    hasRole,
    hasAnyRole,
    isAuthenticated,
  } = useAuth()

  return {
    user,
    loading,
    error,
    register,
    login,
    logout,
    updateUser,
    hasRole,
    hasAnyRole,
    isAuthenticated,
    
    // Helper methods
    isTourist: () => hasRole('tourist'),
    isHost: () => hasRole('host'),
    isDriver: () => hasRole('driver'),
    isProvider: () => hasAnyRole(['host', 'driver']),
  }
}