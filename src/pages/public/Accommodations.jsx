import { useState, useEffect } from 'react';
import { accommodationAPI } from '../../api/accommodation.api';

const Accommodations = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchAccommodations();
  }, []);

  const fetchAccommodations = async () => {
    try {
      const response = await accommodationAPI.getAll();
      setAccommodations(response.data || []);
    } catch (error) {
      console.error('Error fetching accommodations:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAccommodations = accommodations.filter(acc =>
    acc.title.toLowerCase().includes(filter.toLowerCase()) ||
    acc.location.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading) {
    return <div className="text-center py-20"><span className="text-4xl">⏳</span></div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Safari Accommodations</h1>
          <p className="text-xl text-gray-600">Find your perfect place to stay</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search by location or title..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full px-6 py-4 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          />
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">Showing {filteredAccommodations.length} accommodations</p>
        </div>

        {/* Accommodations Grid */}
        {filteredAccommodations.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAccommodations.map((accommodation) => (
              <div key={accommodation.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition">
                {/* Image Section */}
                <div className="h-56 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white text-5xl">
                  🏨
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{accommodation.title}</h3>
                  <p className="text-gray-600 mb-4 flex items-center gap-2">
                    📍 {accommodation.location}
                  </p>

                  {/* Description */}
                  <p className="text-gray-700 mb-4 line-clamp-2">{accommodation.description}</p>

                  {/* Amenities */}
                  <div className="mb-4 space-y-2 text-sm text-gray-600">
                    <p>👥 Capacity: <span className="font-semibold">{accommodation.capacity} guests</span></p>
                    <p className="inline-block">
                      {accommodation.available ? (
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                          ✓ Available
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">
                          ✗ Not Available
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Price and Action */}
                  <div className="border-t pt-4 flex justify-between items-center">
                    <span className="text-3xl font-bold text-blue-600">${accommodation.price_per_night}</span>
                    <span className="text-sm text-gray-500">per night</span>
                  </div>

                  {/* Book Button */}
                  <button className="w-full mt-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition">
                    View Details & Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No accommodations found</h3>
            <p className="text-gray-600">Try adjusting your search filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Accommodations;