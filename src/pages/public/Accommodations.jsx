import { useState, useEffect } from 'react';
import { accommodationAPI } from '../../api/accommodation.api';
import AccommodationList from '../../components/accommodation/AccommodationList';

const Accommodations = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({
    location: '',
    checkIn: '',
    checkOut: ''
  });

  useEffect(() => {
    fetchAccommodations();
  }, []);

  const fetchAccommodations = async () => {
    try {
      const response = await accommodationAPI.getAll();
      setAccommodations(response.data);
    } catch (error) {
      console.error('Error fetching accommodations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await accommodationAPI.search(
        searchParams.location,
        `${searchParams.checkIn},${searchParams.checkOut}`
      );
      setAccommodations(response.data);
    } catch (error) {
      console.error('Search error:', error);
      fetchAccommodations();
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSearchParams({ location: '', checkIn: '', checkOut: '' });
    fetchAccommodations();
  };

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6">Find Your Stay</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Location"
            value={searchParams.location}
            onChange={(e) => setSearchParams({...searchParams, location: e.target.value})}
            className="border rounded px-4 py-3"
          />
          <input
            type="date"
            placeholder="Check-in"
            value={searchParams.checkIn}
            onChange={(e) => setSearchParams({...searchParams, checkIn: e.target.value})}
            className="border rounded px-4 py-3"
          />
          <input
            type="date"
            placeholder="Check-out"
            value={searchParams.checkOut}
            onChange={(e) => setSearchParams({...searchParams, checkOut: e.target.value})}
            className="border rounded px-4 py-3"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSearch}
              className="flex-1 bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
            >
              Search
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-3 border rounded hover:bg-gray-50"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div>
        {loading ? (
          <div className="text-center py-10">Loading accommodations...</div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {accommodations.length} Accommodations Found
              </h2>
              <select className="border rounded px-4 py-2">
                <option>Sort by: Price (Low to High)</option>
                <option>Sort by: Price (High to Low)</option>
                <option>Sort by: Rating</option>
              </select>
            </div>
            <AccommodationList accommodations={accommodations} />
          </>
        )}
      </div>
    </div>
  );
};

export default Accommodations;