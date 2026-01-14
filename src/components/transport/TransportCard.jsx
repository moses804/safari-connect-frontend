const TransportCard = ({ transport }) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-lg">{transport.type}</h3>
          <p className="text-gray-600">{transport.company}</p>
        </div>
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
          {transport.seatsAvailable} seats
        </span>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center">
          <span className="font-medium">From:</span>
          <span className="ml-2">{transport.from}</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium">To:</span>
          <span className="ml-2">{transport.to}</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium">Departure:</span>
          <span className="ml-2">{transport.departureTime}</span>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="font-bold text-lg">${transport.price}</span>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default TransportCard;