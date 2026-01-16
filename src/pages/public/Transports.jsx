import { useState, useEffect } from 'react';
import { transportAPI } from '../../api/transport.api';

const Transports = () => {
  const [transports, setTransports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchTransports();
  }, []);

  const fetchTransports = async () => {
    try {
      const response = await transportAPI.getAll();
      setTransports(response.data || []);
    } catch (error) {
      console.error('Error fetching transports:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTransports = transports.filter(transport =>
    transport.vehicle_type.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading) {
    return <div className="text-center py-20"><span className="text-4xl">⏳</span></div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Safari Transportation</h1>
          <p className="text-xl text-gray-600">Book reliable transport for your journey</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search by vehicle type..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full px-6 py-4 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
          />
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">Showing {filteredTransports.length} transports</p>
        </div>

        {/* Transports Grid */}
        {filteredTransports.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTransports.map((transport) => (
              <div key={transport.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition">
                {/* Image Section */}
                <div className="h-56 bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center text-white text-5xl">
                  🚌
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{transport.vehicle_type}</h3>
                  
                  {/* Amenities */}
                  <div className="mb-4 space-y-2 text-sm text-gray-600">
                    <p>👥 Capacity: <span className="font-semibold">{transport.total_capacity} seats</span></p>
                    <p className="inline-block">
                      {transport.available ? (
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
                    <span className="text-3xl font-bold text-green-600">${transport.price_per_day}</span>
                    <span className="text-sm text-gray-500">per day</span>
                  </div>

                  {/* Book Button */}
                  <button className="w-full mt-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-800 transition">
                    View Details & Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No transports found</h3>
            <p className="text-gray-600">Try adjusting your search filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transports;