import { useState } from "react";
import { bookingAPI } from "../../api/booking.api";
import { useAuthHook } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const TransportBookingForm = ({ transport, onSuccess }) => {
  const { user } = useAuthHook();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    travel_date: "",
    seats_booked: 1,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const bookingData = {
        transport_id: transport.id,
        travel_date: formData.travel_date,
        seats_booked: parseInt(formData.seats_booked),
        total_price: transport.price_per_day * parseInt(formData.seats_booked),
      };

      await bookingAPI.createTransportBooking(bookingData);
      setFormData({ travel_date: "", seats_booked: 1 });
      if (onSuccess) onSuccess();
    } catch (error) {
      setError(
        error.response?.data?.message || error.message || "Booking failed",
      );
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="p-6 bg-green-50 border-l-4 border-green-500 rounded-lg">
        <p className="text-green-900 font-semibold mb-3">
          Please log in to book this transport
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/login?redirect=/transports`)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Log In
          </button>
          <button
            onClick={() => navigate(`/register?redirect=/transports`)}
            className="px-4 py-2 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition"
          >
            Sign Up
          </button>
        </div>
      </div>
    );
  }

  if (user.role !== "tourist") {
    return (
      <div className="p-6 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg">
        <p className="text-yellow-900 font-semibold">
          Only travelers can book transport. Your current role is: {user.role}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded-lg border border-gray-200 shadow"
    >
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Book This Transport
      </h3>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Travel Date
          </label>
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
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Number of Seats
          </label>
          <input
            type="number"
            name="seats_booked"
            min="1"
            max={transport.total_capacity}
            value={formData.seats_booked}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            Available: {transport.total_capacity} seats
          </p>
        </div>

        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-900 font-semibold text-lg">
            Total: $
            {(
              transport.price_per_day * parseInt(formData.seats_booked)
            ).toFixed(2)}
          </p>
          <p className="text-sm text-green-700">
            {formData.seats_booked} seat(s) × ${transport.price_per_day}/day
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {loading ? "Booking..." : "Book Transport"}
        </button>
      </div>
    </form>
  );
};

export default TransportBookingForm;
