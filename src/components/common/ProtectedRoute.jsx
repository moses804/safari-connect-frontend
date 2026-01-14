import { Navigate, useLocation } from 'react-router-dom'
import { useAuthHook } from '../../hooks/useAuth.js'
import Loader from './Loader.jsx'

const ProtectedRoute = ({ children, requireAuth = true }) => {
  const { isAuthenticated, loading } = useAuthHook()
  const location = useLocation()

  if (loading) {
    return <Loader />
  }

  if (requireAuth && !isAuthenticated) {
    // Redirect to login page, saving the current location
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (!requireAuth && isAuthenticated) {
    // If user is authenticated but trying to access auth pages (login/register)
    // Redirect them to appropriate dashboard
    const { user } = JSON.parse(localStorage.getItem('user') || '{}')
    if (user?.role === 'tourist') return <Navigate to="/tourist/dashboard" replace />
    if (user?.role === 'host') return <Navigate to="/host/dashboard" replace />
    if (user?.role === 'driver') return <Navigate to="/driver/dashboard" replace />
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute