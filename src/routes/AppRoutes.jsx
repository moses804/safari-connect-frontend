import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from '../components/common/ProtectedRoute.jsx'
import RoleGuard from '../components/common/RoleGuard.jsx'
import DashboardLayout from '../layouts/DashboardLayout.jsx'
import PublicLayout from '../layouts/PublicLayout.jsx'

// Public pages
import Home from '../pages/public/Home.jsx'
import Accommodations from '../pages/public/Accommodations.jsx'
import Transports from '../pages/public/Transports.jsx'

// Authentication pages
import Login from '../pages/auth/Login.jsx'
import Register from '../pages/auth/Register.jsx'

// Tourist pages
import TouristDashboard from '../pages/tourist/TouristDashboard.jsx'
import MyBookings from '../pages/tourist/MyBookings.jsx'

// Host pages
import HostDashboard from '../pages/host/HostDashboard.jsx'
import ManageAccommodations from '../pages/host/ManageAccommodations.jsx'

// Driver pages
import DriverDashboard from '../pages/driver/DriverDashboard.jsx'
import ManageTransports from '../pages/driver/ManageTransports.jsx'

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={
        <PublicLayout>
          <Home />
        </PublicLayout>
      } />
      <Route path="/accommodations" element={
        <PublicLayout>
          <Accommodations />
        </PublicLayout>
      } />
      <Route path="/transports" element={
        <PublicLayout>
          <Transports />
        </PublicLayout>
      } />

      {/* Authentication routes */}
      <Route path="/login" element={
        <ProtectedRoute requireAuth={false}>
          <Login />
        </ProtectedRoute>
      } />
      <Route path="/register" element={
        <ProtectedRoute requireAuth={false}>
          <Register />
        </ProtectedRoute>
      } />

      {/* Tourist routes */}
      <Route path="/tourist" element={
        <ProtectedRoute>
          <RoleGuard allowedRoles={['tourist']}>
            <DashboardLayout />
          </RoleGuard>
        </ProtectedRoute>
      }>
        <Route index element={<TouristDashboard />} />
        <Route path="dashboard" element={<TouristDashboard />} />
        <Route path="bookings" element={<MyBookings />} />
      </Route>

      {/* Host routes */}
      <Route path="/host" element={
        <ProtectedRoute>
          <RoleGuard allowedRoles={['host']}>
            <DashboardLayout />
          </RoleGuard>
        </ProtectedRoute>
      }>
        <Route index element={<HostDashboard />} />
        <Route path="dashboard" element={<HostDashboard />} />
        <Route path="accommodations" element={<ManageAccommodations />} />
      </Route>

      {/* Driver routes */}
      <Route path="/driver" element={
        <ProtectedRoute>
          <RoleGuard allowedRoles={['driver']}>
            <DashboardLayout />
          </RoleGuard>
        </ProtectedRoute>
      }>
        <Route index element={<DriverDashboard />} />
        <Route path="dashboard" element={<DriverDashboard />} />
        <Route path="transports" element={<ManageTransports />} />
      </Route>

      {/* 404 route */}
      <Route path="*" element={
        <div className="text-center py-20">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-xl text-gray-600">Page not found</p>
        </div>
      } />
    </Routes>
  )
}

export default AppRoutes