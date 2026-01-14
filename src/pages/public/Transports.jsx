import { useState, useEffect } from 'react';
import { transportAPI } from '../../api/transport.api';
import TransportList from '../../components/transport/TransportList';

const Transports = () => {
  const [transports, setTransports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: ''
  });

  useEffect(() => {
    fetchTransports();
  }, []);

  const fetchTransports = async () => {
    try {
      const response = await transportAPI.getAll();
      setTransports(response.data);
    } catch (error) {
      console.error('Error fetching transports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await transportAPI.search(
        searchParams.from,
        searchParams.to,
        searchParams.date
      );
      setTransports(response.data);
    } catch (error) {
      console.error('Search error:', error);
      fetchTransports();
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSearchParams({ from: '', to: '', date: '' });
    fetchTransports();
  };

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6">Find Transportation</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="From"
            value={searchParams.from}
            onChange={(e) => setSearchParams({...searchParams, from: e.target.value})}
            className="border rounded px-4 py-3"
          />
          <input
            type="text"
            placeholder="To"
            value={searchParams.to}
            onChange={(e) => setSearchParams({...searchParams, to: e.target.value})}
            className="border rounded px-4 py-3"
          />
          <input
            type="date"
            value={searchParams.date}
            onChange={(e) => setSearchParams({...searchParams, date: e.target.value})}
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
          <div className="text-center py-10">Loading transports...</div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {transports.length} Transports Available
              </h2>
              <select className="border rounded px-4 py-2">
                <option>Sort by: Departure Time</option>
                <option>Sort by: Price</option>
                <option>Sort by: Duration</option>
              </select>
            </div>
            <TransportList transports={transports} />
          </>
        )}
      </div>
    </div>
  );
};

export default Transports;