import { useState } from "react";
import { bookingAPI } from "../../api/booking.api";
import { useAuthHook } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const AccommodationBookingForm = ({ accommodation, onSuccess }) => {
  const { user } = useAuthHook();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    check_in_date: "",
    check_out_date: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState(0);

  const calculatePrice = (checkIn, checkOut) => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const nights = (end - start) / (1000 * 60 * 60 * 24);
      if (nights > 0) {
        return accommodation.price_per_night * nights;
      }
    }
    return 0;
  };

  const handleDateChange = (e) => {
    const newData = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(newData);
    setEstimatedPrice(
      calculatePrice(newData.check_in_date, newData.check_out_date),
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const checkIn = new Date(formData.check_in_date);
      const checkOut = new Date(formData.check_out_date);
      const nights = (checkOut - checkIn) / (1000 * 60 * 60 * 24);

      if (nights <= 0) {
        setError("Check-out date must be after check-in date");
        setLoading(false);
        return;
      }

      const bookingData = {
        accommodation_id: accommodation.id,
        check_in_date: formData.check_in_date,
        check_out_date: formData.check_out_date,
        total_price: accommodation.price_per_night * nights,
      };

      await bookingAPI.createAccommodationBooking(bookingData);
      setFormData({ check_in_date: "", check_out_date: "" });
      setEstimatedPrice(0);
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
      <div className="p-6 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
        <p className="text-blue-900 font-semibold mb-3">
          Please log in to book this accommodation
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/login?redirect=/accommodations`)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Log In
          </button>
          <button
            onClick={() => navigate(`/register?redirect=/accommodations`)}
            className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
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
          Only travelers can book accommodations. Your current role is:{" "}
          {user.role}
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
        Book This Accommodation
      </h3>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Check-in Date
          </label>
          <input
            type="date"
            name="check_in_date"
            value={formData.check_in_date}
            onChange={handleDateChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Check-out Date
          </label>
          <input
            type="date"
            name="check_out_date"
            value={formData.check_out_date}
            onChange={handleDateChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {estimatedPrice > 0 && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-900 font-semibold text-lg">
              Estimated Total: ${estimatedPrice.toFixed(2)}
            </p>
            <p className="text-sm text-green-700">
              {Math.round(estimatedPrice / accommodation.price_per_night)}{" "}
              nights × ${accommodation.price_per_night}/night
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </div>
    </form>
  );
};

export default AccommodationBookingForm;
