import { useState, useEffect } from 'react';
import { bookingAPI } from '../../api/booking.api';
import BookingCard from '../../components/booking/BookingCard';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await bookingAPI.getUserBookings();
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await bookingAPI.cancel(bookingId);
        alert('Booking cancelled successfully');
        fetchBookings(); // Refresh the list
      } catch (error) {
        alert('Failed to cancel booking');
      }
    }
  };

  if (loading) return <div className="text-center py-10">Loading bookings...</div>;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
        <p className="text-gray-600">Manage and view all your bookings in one place</p>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-xl shadow p-4">
        <div className="flex flex-wrap gap-2">
          {['all', 'confirmed', 'pending', 'cancelled', 'completed'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-full capitalize ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status} ({status === 'all' ? bookings.length : bookings.filter(b => b.status === status).length})
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      <div>
        {filteredBookings.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-xl">
            <h3 className="text-xl font-bold mb-2">No bookings found</h3>
            <p className="text-gray-600 mb-6">
              {filter === 'all' 
                ? "You haven't made any bookings yet"
                : `You have no ${filter} bookings`
              }
            </p>
            <a
              href="/accommodations"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
            >
              Start Booking Now
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map(booking => (
              <div key={booking.id}>
                <BookingCard booking={booking} />
                {booking.status === 'confirmed' && (
                  <div className="text-right -mt-2 mb-4">
                    <button
                      onClick={() => handleCancelBooking(booking.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Cancel Booking
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Summary */}
      {filteredBookings.length > 0 && (
        <div className="bg-blue-50 rounded-xl p-6">
          <h3 className="font-bold text-lg mb-4">Booking Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-gray-600">Total Bookings:</p>
              <p className="text-2xl font-bold">{filteredBookings.length}</p>
            </div>
            <div>
              <p className="text-gray-600">Total Cost:</p>
              <p className="text-2xl font-bold">
                ${filteredBookings.reduce((sum, b) => sum + b.totalPrice, 0)}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Average Cost:</p>
              <p className="text-2xl font-bold">
                ${filteredBookings.length > 0 
                  ? (filteredBookings.reduce((sum, b) => sum + b.totalPrice, 0) / filteredBookings.length).toFixed(2)
                  : '0.00'
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;