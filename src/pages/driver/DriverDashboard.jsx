import { Link } from "react-router-dom";
import { useAuthHook } from "../../hooks/useAuth";
import { Bus, Calendar, DollarSign, Lightbulb, Hand } from "lucide-react";

const DriverDashboard = () => {
  const { user } = useAuthHook();

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          Welcome, {user?.name}! <Hand className="w-8 h-8 text-yellow-500" />
        </h1>
        <p className="text-gray-600 mt-2">
          Manage your transport services and track bookings
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Bus className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Your Vehicles</p>
              <p className="text-2xl font-bold text-gray-900">-</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-900">-</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Earnings</p>
              <p className="text-2xl font-bold text-gray-900">-</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/driver/transports"
            className="flex items-center gap-4 p-4 border-2 border-green-600 rounded-lg hover:bg-green-50 transition"
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Bus className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Manage Transports</p>
              <p className="text-sm text-gray-600">
                Add, edit, or update your vehicles
              </p>
            </div>
          </Link>
          <Link
            to="/driver/transports"
            className="flex items-center gap-4 p-4 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">View Bookings</p>
              <p className="text-sm text-gray-600">
                See who booked your transport
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-green-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-green-900 mb-3 flex items-center gap-2">
          <Lightbulb className="w-5 h-5" /> Tips for Drivers
        </h3>
        <ul className="space-y-2 text-green-800">
          <li>• Keep your vehicle information and photos up to date</li>
          <li>• Set competitive daily rates based on your vehicle type</li>
          <li>• Maintain good availability to attract more bookings</li>
          <li>• Provide excellent service to get positive reviews</li>
        </ul>
      </div>
    </div>
  );
};

export default DriverDashboard;
