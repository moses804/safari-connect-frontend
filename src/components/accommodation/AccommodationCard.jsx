const AccommodationCard = ({ accommodation }) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="h-48 bg-gray-200 rounded-md mb-3"></div>
      
      <h3 className="font-bold text-lg">{accommodation.name}</h3>
      <p className="text-gray-600 text-sm mb-2">{accommodation.location}</p>
      
      <div className="flex items-center gap-2 mb-2">
        <span className="text-yellow-500">★</span>
        <span>{accommodation.rating || 'New'}</span>
      </div>
      
      <p className="text-gray-700 mb-3">{accommodation.description?.substring(0, 100)}...</p>
      
      <div className="flex justify-between items-center">
        <span className="font-bold text-lg">${accommodation.price}/night</span>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          View Details
        </button>
      </div>
    </div>
  );
};

export default AccommodationCard;