import { useState } from 'react';
import { bookingAPI } from '../../api/booking.api';
import { useAuthHook } from '../../hooks/useAuth';

const TransportBookingForm = ({ transport, onSuccess }) => {
  const { user } = useAuthHook();
  const [formData, setFormData] = useState({
    travel_date: '',
    seats_booked: 1
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const bookingData = {
        transport_id: transport.id,
        travel_date: formData.travel_date,
        seats_booked: parseInt(formData.seats_booked),
        total_price: transport.price_per_day * parseInt(formData.seats_booked)
      };
      
      await bookingAPI.createTransportBooking(bookingData);
      setFormData({ travel_date: '', seats_booked: 1 });
      if (onSuccess) onSuccess();
    } catch (error) {
      setError(error.response?.data?.message || error.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="p-6 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
        <p className="text-blue-900 font-semibold">Please log in to book this transport</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg border border-gray-200 shadow">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Book This Transport</h3>
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Travel Date</label>
          <input
            type="date"
            name="travel_date"
            value={formData.travel_date}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Seats</label>
          <input
            type="number"
            name="seats_booked"
            min="1"
            max="10"
            value={formData.seats_booked}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-900 font-semibold text-lg">
            Total: ${(transport.price_per_day * parseInt(formData.seats_booked)).toFixed(2)}
          </p>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {loading ? 'Booking...' : 'Book Transport'}
        </button>
      </div>
    </form>
  );
};

export default TransportBookingForm;