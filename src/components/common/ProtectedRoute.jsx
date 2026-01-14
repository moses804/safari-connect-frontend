// src/components/common/ProtectedRoute.jsx
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
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
