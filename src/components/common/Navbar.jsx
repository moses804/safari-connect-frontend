// src/components/common/Navbar.jsx
import { Link } from 'react-router-dom'
import { useAuthHook } from '../../hooks/useAuth.js'

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuthHook()

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo / Brand */}
      <Link to="/" className="text-2xl font-bold text-blue-600">
        SafariConnect
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-6">
        <Link to="/accommodations" className="text-gray-700 hover:text-blue-500">
          Accommodations
        </Link>
        <Link to="/transports" className="text-gray-700 hover:text-blue-500">
          Transports
        </Link>

        {isAuthenticated ? (
          <>
            <span className="text-gray-700">Hello, {user.name || user.username}</span>
            <button
              onClick={logout}
              className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
