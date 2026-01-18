import { Link } from "react-router-dom";
import { useAuthHook } from "../../hooks/useAuth";
import { Hotel, Calendar, DollarSign, Lightbulb, Hand } from "lucide-react";

const HostDashboard = () => {
  const { user } = useAuthHook();

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          Welcome, {user?.name}! <Hand className="w-8 h-8 text-yellow-500" />
        </h1>
        <p className="text-gray-600 mt-2">
          Manage your safari accommodations and track bookings
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Hotel className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Your Properties</p>
              <p className="text-2xl font-bold text-gray-900">-</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-green-600" />
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
            to="/host/accommodations"
            className="flex items-center gap-4 p-4 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Hotel className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">
                Manage Accommodations
              </p>
              <p className="text-sm text-gray-600">
                Add, edit, or update your properties
              </p>
            </div>
          </Link>
          <Link
            to="/host/accommodations"
            className="flex items-center gap-4 p-4 border-2 border-green-600 rounded-lg hover:bg-green-50 transition"
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">View Bookings</p>
              <p className="text-sm text-gray-600">
                See who booked your properties
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
          <Lightbulb className="w-5 h-5" /> Tips for Hosts
        </h3>
        <ul className="space-y-2 text-blue-800">
          <li>
            • Add high-quality photos of your property to attract more guests
          </li>
          <li>• Set competitive prices based on local market rates</li>
          <li>• Keep your availability calendar up to date</li>
          <li>• Respond promptly to booking requests</li>
        </ul>
      </div>
    </div>
  );
};

export default HostDashboard;
