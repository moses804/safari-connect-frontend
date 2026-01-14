import { useState } from 'react';
import { bookingAPI } from '../../api/booking.api';

const TransportBookingForm = ({ transportId, onSuccess }) => {
  const [formData, setFormData] = useState({
    seats: 1,
    pickupLocation: '',
    notes: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const bookingData = {
        transportId,
        ...formData,
        type: 'transport'
      };
      await bookingAPI.create(bookingData);
      alert('Transport booked successfully!');
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
      <h3 className="text-xl font-bold">Book Transport</h3>
      
      <div>
        <label className="block text-sm font-medium mb-1">Number of Seats</label>
        <input
          type="number"
          name="seats"
          min="1"
          max="10"
          value={formData.seats}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Pickup Location</label>
        <input
          type="text"
          name="pickupLocation"
          value={formData.pickupLocation}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          placeholder="Enter pickup address"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Special Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          rows="3"
          placeholder="Any special instructions for the driver"
        />
      </div>
      
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Book Transport
      </button>
    </form>
  );
};

export default TransportBookingForm;