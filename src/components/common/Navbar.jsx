import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthHook } from "../../hooks/useAuth";
import { Palmtree, User, Hotel, Bus, BarChart3, ClipboardList, LogOut } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, isAuthenticated, logout, isTourist, isHost, isDriver } =
    useAuthHook();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate("/");
  };

  // Handle mouse enter/leave with a small delay to prevent flickering
  let closeTimeout;
  const handleMouseEnter = () => {
    clearTimeout(closeTimeout);
    setIsUserMenuOpen(true);
  };
  const handleMouseLeave = () => {
    closeTimeout = setTimeout(() => setIsUserMenuOpen(false), 150);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Palmtree className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-blue-600">
                SafariConnect
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/accommodations"
              className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md font-medium"
            >
              Accommodations
            </Link>
            <Link
              to="/transports"
              className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md font-medium"
            >
              Transport
            </Link>

            {isAuthenticated ? (
              <>
                {/* Role-specific links */}
                {isTourist() && (
                  <>
                    <Link
                      to="/tourist/dashboard"
                      className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md font-medium"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/tourist/bookings"
                      className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md font-medium"
                    >
                      My Bookings
                    </Link>
                  </>
                )}

                {isHost() && (
                  <>
                    <Link
                      to="/host/dashboard"
                      className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md font-medium"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/host/accommodations"
                      className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md font-medium"
                    >
                      My Accommodations
                    </Link>
                  </>
                )}

                {isDriver() && (
                  <>
                    <Link
                      to="/driver/dashboard"
                      className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md font-medium"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/driver/transports"
                      className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md font-medium"
                    >
                      My Transports
                    </Link>
                  </>
                )}

                {/* User menu */}
                <div
                  className="relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md font-medium">
                    <User className="w-5 h-5" />
                    <span>{user?.name}</span>
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full capitalize">
                      {user?.role}
                    </span>
                  </button>
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md font-medium"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-3">
            <Link
              to="/accommodations"
              className="block text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md font-medium"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center gap-2">
                <Hotel className="w-5 h-5" />
                <span>Accommodations</span>
              </div>
            </Link>
            <Link
              to="/transports"
              className="block text-gray-600 hover:text-green-600 px-3 py-2 rounded-md font-medium"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center gap-2">
                <Bus className="w-5 h-5" />
                <span>Transport</span>
              </div>
            </Link>

            {isAuthenticated ? (
              <>
                {isTourist() && (
                  <>
                    <Link
                      to="/tourist/dashboard"
                      className="block text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5" />
                        <span>Dashboard</span>
                      </div>
                    </Link>
                    <Link
                      to="/tourist/bookings"
                      className="block text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-center gap-2">
                        <ClipboardList className="w-5 h-5" />
                        <span>My Bookings</span>
                      </div>
                    </Link>
                  </>
                )}

                {isHost() && (
                  <>
                    <Link
                      to="/host/dashboard"
                      className="block text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5" />
                        <span>Dashboard</span>
                      </div>
                    </Link>
                    <Link
                      to="/host/accommodations"
                      className="block text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-center gap-2">
                        <Hotel className="w-5 h-5" />
                        <span>My Accommodations</span>
                      </div>
                    </Link>
                  </>
                )}

                {isDriver() && (
                  <>
                    <Link
                      to="/driver/dashboard"
                      className="block text-gray-600 hover:text-green-600 px-3 py-2 rounded-md font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5" />
                        <span>Dashboard</span>
                      </div>
                    </Link>
                    <Link
                      to="/driver/transports"
                      className="block text-gray-600 hover:text-green-600 px-3 py-2 rounded-md font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-center gap-2">
                        <Bus className="w-5 h-5" />
                        <span>My Transports</span>
                      </div>
                    </Link>
                  </>
                )}

                <div className="border-t pt-3">
                  <p className="px-3 py-2 text-sm text-gray-500">
                    Signed in as {user?.name} ({user?.role})
                  </p>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-md font-medium"
                  >
                    <div className="flex items-center gap-2">
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </div>
                  </button>
                </div>
              </>
            ) : (
              <div className="border-t pt-3 space-y-2">
                <Link
                  to="/login"
                  className="block text-center text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md font-medium border"
                  onClick={() => setIsOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="block text-center bg-blue-600 text-white px-3 py-2 rounded-lg font-semibold hover:bg-blue-700"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
