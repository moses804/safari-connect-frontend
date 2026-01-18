import { Link } from "react-router-dom";
import { useAuthHook } from "../../hooks/useAuth";
import { useBooking } from "../../context/BookingContext";
import { Hotel, Bus, Calendar, CheckCircle, ClipboardList, Lightbulb, Hand } from "lucide-react";

const TouristDashboard = () => {
  const { user } = useAuthHook();
  const { bookings } = useBooking();

  const upcomingBookings = bookings.filter(
    (b) =>
      b.status !== "cancelled" &&
      new Date(b.check_in_date || b.travel_date) >= new Date(),
  );

  const pastBookings = bookings.filter(
    (b) =>
      b.status === "cancelled" ||
      new Date(b.check_out_date || b.travel_date) < new Date(),
  );

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          Welcome back, {user?.name}! <Hand className="w-8 h-8 text-yellow-500" />
        </h1>
        <p className="text-gray-600 mt-2">Plan your next safari adventure</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Link
          to="/accommodations"
          className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition border-2 border-transparent hover:border-blue-500"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Hotel className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Browse Accommodations
              </h3>
              <p className="text-gray-600">Find your perfect safari stay</p>
            </div>
          </div>
        </Link>
        <Link
          to="/transports"
          className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition border-2 border-transparent hover:border-green-500"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Bus className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Find Transport
              </h3>
              <p className="text-gray-600">
                Book reliable safari transportation
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-900">
                {bookings.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Upcoming Trips</p>
              <p className="text-2xl font-bold text-gray-900">
                {upcomingBookings.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <ClipboardList className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Completed</p>
              <p className="text-2xl font-bold text-gray-900">
                {pastBookings.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* My Bookings Link */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Your Bookings</h2>
          <Link
            to="/tourist/bookings"
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            View All Bookings
          </Link>
        </div>
        {upcomingBookings.length > 0 ? (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingBookings.slice(0, 2).map((booking) => (
              <div key={booking.id} className="border rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div>
                    {booking.accommodation_id ? (
                      <Hotel className="w-6 h-6 text-blue-600" />
                    ) : (
                      <Bus className="w-6 h-6 text-green-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">
                      {booking.accommodation_id ? "Accommodation" : "Transport"}
                    </p>
                    <p className="text-sm text-gray-600">
                      {booking.check_in_date
                        ? `${new Date(booking.check_in_date).toLocaleDateString()} - ${new Date(booking.check_out_date).toLocaleDateString()}`
                        : new Date(booking.travel_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 mt-4">
            No upcoming bookings. Start planning your safari!
          </p>
        )}
      </div>

      {/* Tips Section */}
      <div className="bg-yellow-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-yellow-900 mb-3 flex items-center gap-2">
          <Lightbulb className="w-5 h-5" /> Safari Tips
        </h3>
        <ul className="space-y-2 text-yellow-800">
          <li>• Book accommodations in advance for the best selection</li>
          <li>
            • Consider combining accommodation and transport for a complete
            package
          </li>
          <li>• Check reviews and ratings before booking</li>
          <li>
            • Contact hosts/drivers directly if you have special requirements
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TouristDashboard;
