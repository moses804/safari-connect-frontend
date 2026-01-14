import { Navigate } from 'react-router-dom'
import { useAuthHook } from '../../hooks/useAuth.js'
import Loader from './Loader.jsx'

const RoleGuard = ({ children, allowedRoles }) => {
  const { user, loading, hasAnyRole } = useAuthHook()

  if (loading) {
    return <Loader />
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (!hasAnyRole(allowedRoles)) {
    // Redirect to unauthorized page or dashboard based on role
    if (user.role === 'tourist') return <Navigate to="/tourist/dashboard" replace />
    if (user.role === 'host') return <Navigate to="/host/dashboard" replace />
    if (user.role === 'driver') return <Navigate to="/driver/dashboard" replace />
    return <Navigate to="/" replace />
  }

  return children
}

export default RoleGuard