import { useState, useEffect } from 'react';
import { bookingAPI } from '../../api/booking.api';
import { accommodationAPI } from '../../api/accommodation.api.js';
import { transportAPI } from '../../api/transport.api.js';
import BookingCard from '../../components/booking/BookingCard';

const TouristDashboard = () => {
  const [recentBookings, setRecentBookings] = useState([]);
  const [recommendations, setRecommendations] = useState({
    accommodations: [],
    transports: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [bookingsRes, accRes, transRes] = await Promise.all([
        bookingAPI.getUserBookings(),
        accommodationAPI.getAll(),
        transportAPI.getAll()
      ]);
      
      setRecentBookings(bookingsRes.data.slice(0, 5));
      setRecommendations({
        accommodations: accRes.data.slice(0, 3),
        transports: transRes.data.slice(0, 3)
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading dashboard...</div>;

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Tourist!</h1>
        <p className="text-xl">Manage your bookings and discover new experiences</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow border">
          <h3 className="text-gray-600 text-sm font-medium">Total Bookings</h3>
          <p className="text-3xl font-bold mt-2">{recentBookings.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border">
          <h3 className="text-gray-600 text-sm font-medium">Active Trips</h3>
          <p className="text-3xl font-bold mt-2">
            {recentBookings.filter(b => b.status === 'confirmed').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border">
          <h3 className="text-gray-600 text-sm font-medium">Total Spent</h3>
          <p className="text-3xl font-bold mt-2">
            ${recentBookings.reduce((sum, b) => sum + b.totalPrice, 0)}
          </p>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recent Bookings</h2>
          <a href="/my-bookings" className="text-blue-600 hover:underline">
            View all bookings →
          </a>
        </div>
        
        {recentBookings.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No bookings yet. Start exploring!</p>
        ) : (
          <div className="space-y-4">
            {recentBookings.map(booking => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </div>

      {/* Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Accommodation Recommendations */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">Recommended Stays</h2>
          <div className="space-y-4">
            {recommendations.accommodations.map(acc => (
              <div key={acc.id} className="border rounded p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between">
                  <h4 className="font-bold">{acc.name}</h4>
                  <span className="font-bold">${acc.price}/night</span>
                </div>
                <p className="text-gray-600 text-sm mt-1">{acc.location}</p>
                <button className="mt-3 w-full bg-blue-50 text-blue-600 py-2 rounded hover:bg-blue-100">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Transport Recommendations */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">Recommended Transport</h2>
          <div className="space-y-4">
            {recommendations.transports.map(trans => (
              <div key={trans.id} className="border rounded p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-bold">{trans.type}</h4>
                    <p className="text-gray-600 text-sm">{trans.from} → {trans.to}</p>
                  </div>
                  <span className="font-bold">${trans.price}</span>
                </div>
                <p className="text-gray-600 text-sm mt-1">Departure: {trans.departureTime}</p>
                <button className="mt-3 w-full bg-green-50 text-green-600 py-2 rounded hover:bg-green-100">
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <button className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
            Book Accommodation
          </button>
          <button className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700">
            Book Transport
          </button>
          <button className="px-6 py-3 border rounded hover:bg-white">
            View All Accommodations
          </button>
          <button className="px-6 py-3 border rounded hover:bg-white">
            View All Transports
          </button>
        </div>
      </div>
    </div>
  );
};

export default TouristDashboard;