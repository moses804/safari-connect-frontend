import { useState } from 'react';
import { bookingAPI } from '../../api/booking.api';

const AccommodationBookingForm = ({ accommodationId, onSuccess }) => {
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    specialRequests: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const bookingData = {
        accommodationId,
        ...formData,
        type: 'accommodation'
      };
      await bookingAPI.create(bookingData);
      alert('Booking successful!');
      if (onSuccess) onSuccess();
    } catch (error) {
      alert('Booking failed. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-bold">Book Accommodation</h3>
      
      <div>
        <label className="block text-sm font-medium mb-1">Check-in Date</label>
        <input
          type="date"
          name="checkIn"
          value={formData.checkIn}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Check-out Date</label>
        <input
          type="date"
          name="checkOut"
          value={formData.checkOut}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Number of Guests</label>
        <select
          name="guests"
          value={formData.guests}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          {[1, 2, 3, 4, 5, 6].map(num => (
            <option key={num} value={num}>{num} {num === 1 ? 'guest' : 'guests'}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Special Requests</label>
        <textarea
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          rows="3"
        />
      </div>
      
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Confirm Booking
      </button>
    </form>
  );
};

export default AccommodationBookingForm;