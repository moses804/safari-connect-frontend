// src/pages/tourist/MyBookings.jsx
import { useEffect, useState } from "react";
import { useBooking } from "../../context/BookingContext.jsx";
import Loader from "../../components/common/Loader.jsx";
import BookingCard from "../../components/booking/BookingCard.jsx";

const MyBookings = () => {
  const { bookings, fetchBookings } = useBooking();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookings = async () => {
      setLoading(true);
      try {
        await fetchBookings(); // Fetch bookings from context / API
      } catch (err) {
        console.error("Failed to load bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  if (loading) return <Loader />;

  if (!bookings || bookings.length === 0) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-semibold text-gray-700">
          No bookings yet
        </h2>
        <p className="text-gray-500 mt-2">
          Book accommodations or transport to see them here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">My Bookings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
