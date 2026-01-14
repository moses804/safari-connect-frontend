const BookingCard = ({ booking }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusColor = (status) => {
    const colors = {
      confirmed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800',
      completed: 'bg-blue-100 text-blue-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="border rounded-lg p-4 mb-4 shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-lg">{booking.serviceName}</h3>
          <p className="text-gray-600">
            Booking ID: <span className="font-mono">{booking.id.slice(0, 8)}...</span>
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(booking.status)}`}>
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-gray-600">Type:</p>
          <p className="font-medium">{booking.type}</p>
        </div>
        
        {booking.type === 'accommodation' ? (
          <>
            <div>
              <p className="text-gray-600">Check-in:</p>
              <p className="font-medium">{formatDate(booking.checkIn)}</p>
            </div>
            <div>
              <p className="text-gray-600">Check-out:</p>
              <p className="font-medium">{formatDate(booking.checkOut)}</p>
            </div>
            <div>
              <p className="text-gray-600">Guests:</p>
              <p className="font-medium">{booking.guests}</p>
            </div>
          </>
        ) : (
          <>
            <div>
              <p className="text-gray-600">From:</p>
              <p className="font-medium">{booking.from}</p>
            </div>
            <div>
              <p className="text-gray-600">To:</p>
              <p className="font-medium">{booking.to}</p>
            </div>
            <div>
              <p className="text-gray-600">Seats:</p>
              <p className="font-medium">{booking.seats}</p>
            </div>
          </>
        )}
        
        <div>
          <p className="text-gray-600">Total Price:</p>
          <p className="font-bold text-lg">${booking.totalPrice}</p>
        </div>
      </div>
      
      <div className="flex justify-end gap-3">
        <button className="px-4 py-2 border rounded hover:bg-gray-50">
          View Details
        </button>
        {booking.status === 'confirmed' && (
          <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
            Cancel Booking
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingCard;