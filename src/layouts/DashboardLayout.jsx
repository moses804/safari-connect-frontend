import { Outlet } from 'react-router-dom'
import { useAuthHook } from '../hooks/useAuth.js'

const DashboardLayout = () => {
  const { user } = useAuthHook()

  const getGreeting = () => {
    if (!user) return 'Welcome'
    
    const hour = new Date().getHours()
    if (hour < 12) return `Good morning, ${user.name || user.username}`
    if (hour < 18) return `Good afternoon, ${user.name || user.username}`
    return `Good evening, ${user.name || user.username}`
  }

  const getRoleBadge = () => {
    if (!user) return null
    
    const roleColors = {
      tourist: 'bg-blue-100 text-blue-800',
      host: 'bg-green-100 text-green-800',
      driver: 'bg-purple-100 text-purple-800',
    }
    
    const roleLabels = {
      tourist: 'Tourist',
      host: 'Host',
      driver: 'Driver',
    }
    
    return (
      <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${roleColors[user.role]}`}>
        {roleLabels[user.role]}
      </span>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{getGreeting()}</h1>
            <p className="text-gray-600 mt-1">
              Manage your {user?.role === 'tourist' ? 'bookings' : 'services'} from your dashboard
            </p>
          </div>
          {getRoleBadge()}
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default DashboardLayout