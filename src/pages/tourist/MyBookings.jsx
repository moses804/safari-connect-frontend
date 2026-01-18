// src/pages/tourist/MyBookings.jsx
import { useEffect, useState } from "react";
import { useBooking } from "../../context/BookingContext.jsx";
import { Link } from "react-router-dom";

const MyBookings = () => {
  const { bookings, fetchBookings, loading: contextLoading } = useBooking();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookings = async () => {
      setLoading(true);
      try {
        await fetchBookings();
      } catch (err) {
        console.error("Failed to load bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  const accommodationBookings = bookings.filter(b => b.accommodation_id);
  const transportBookings = bookings.filter(b => b.transport_id);

  if (loading || contextLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl animate-spin mb-4">⏳</div>
          <p className="text-gray-600 text-lg">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">My Bookings</h1>
          <p className="text-xl text-gray-600">Manage all your safari bookings in one place</p>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-lg p-16 text-center">
            <div className="text-6xl mb-6">📅</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">No bookings yet</h2>
            <p className="text-gray-600 text-lg mb-8">
              Start booking accommodations and transports for your next safari adventure
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                to="/accommodations"
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Browse Accommodations
              </Link>
              <Link
                to="/transports"
                className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
              >
                Browse Transports
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Accommodation Bookings */}
            {accommodationBookings.length > 0 && (
              <section className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                  <span className="text-4xl">🏨</span> Accommodation Bookings
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {accommodationBookings.map((booking) => (
                    <div key={booking.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition">
                      <div className="h-40 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white text-5xl">
                        🏨
                      </div>
                      <div className="p-6">
                        <div className="mb-4">
                          <p className="text-sm text-gray-500 mb-1">Booking ID: #{booking.id}</p>
                          <p className="text-sm text-gray-500 mb-4">
                            {booking.status === 'pending' && '⏳ Pending'}
                            {booking.status === 'confirmed' && '✓ Confirmed'}
                            {booking.status === 'cancelled' && '✗ Cancelled'}
                          </p>
                        </div>
                        <div className="space-y-3 mb-6">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Check-in:</span>
                            <span className="font-semibold">{new Date(booking.check_in_date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Check-out:</span>
                            <span className="font-semibold">{new Date(booking.check_out_date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between border-t pt-3">
                            <span className="text-gray-600 font-semibold">Total Price:</span>
                            <span className="text-2xl font-bold text-blue-600">${booking.total_price.toFixed(2)}</span>
                          </div>
                        </div>
                        <button className="w-full py-2 border border-red-600 text-red-600 font-semibold rounded-lg hover:bg-red-50 transition">
                          Cancel Booking
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Transport Bookings */}
            {transportBookings.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                  <span className="text-4xl">🚌</span> Transport Bookings
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {transportBookings.map((booking) => (
                    <div key={booking.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition">
                      <div className="h-40 bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center text-white text-5xl">
                        🚌
                      </div>
                      <div className="p-6">
                        <div className="mb-4">
                          <p className="text-sm text-gray-500 mb-1">Booking ID: #{booking.id}</p>
                          <p className="text-sm text-gray-500 mb-4">
                            {booking.status === 'pending' && '⏳ Pending'}
                            {booking.status === 'confirmed' && '✓ Confirmed'}
                            {booking.status === 'cancelled' && '✗ Cancelled'}
                          </p>
                        </div>
                        <div className="space-y-3 mb-6">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Travel Date:</span>
                            <span className="font-semibold">{new Date(booking.travel_date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Seats:</span>
                            <span className="font-semibold">{booking.seats_booked}</span>
                          </div>
                          <div className="flex justify-between border-t pt-3">
                            <span className="text-gray-600 font-semibold">Total Price:</span>
                            <span className="text-2xl font-bold text-green-600">${booking.total_price.toFixed(2)}</span>
                          </div>
                        </div>
                        <button className="w-full py-2 border border-red-600 text-red-600 font-semibold rounded-lg hover:bg-red-50 transition">
                          Cancel Booking
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
