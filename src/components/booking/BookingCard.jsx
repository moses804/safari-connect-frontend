// src/components/booking/BookingCard.jsx
const BookingCard = ({ booking }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
      <h2 className="text-lg font-bold text-gray-900">{booking.name}</h2>
      <p className="text-gray-600 mt-1">
        Type: <span className="font-medium">{booking.type}</span>
      </p>
      <p className="text-gray-600 mt-1">
        Date: <span className="font-medium">{booking.date}</span>
      </p>
      <p className="mt-2">
        Status:{" "}
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            booking.status === "Confirmed"
              ? "bg-green-100 text-green-800"
              : booking.status === "Pending"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {booking.status}
        </span>
      </p>
    </div>
  )
}

export default BookingCard
