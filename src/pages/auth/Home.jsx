import { useState, useEffect } from 'react';
import { accommodationAPI } from '../../api/accommodation.api';
import { transportAPI } from '../../api/transport.api';
import AccommodationCard from '../../components/accommodation/AccommodationCard';
import TransportCard from '../../components/transport/TransportCard';

const Home = () => {
  const [featuredAccommodations, setFeaturedAccommodations] = useState([]);
  const [featuredTransports, setFeaturedTransports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [accResponse, transResponse] = await Promise.all([
        accommodationAPI.getAll(),
        transportAPI.getAll()
      ]);
      setFeaturedAccommodations(accResponse.data.slice(0, 3));
      setFeaturedTransports(transResponse.data.slice(0, 3));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-8">
        <h1 className="text-4xl font-bold mb-4">Discover Your Perfect Getaway</h1>
        <p className="text-xl mb-6">Book accommodations and transportation in one place</p>
        <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100">
          Start Exploring
        </button>
      </section>

      {/* Featured Accommodations */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Featured Accommodations</h2>
          <a href="/accommodations" className="text-blue-600 hover:underline">
            View all →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredAccommodations.map(acc => (
            <AccommodationCard key={acc.id} accommodation={acc} />
          ))}
        </div>
      </section>

      {/* Featured Transports */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Featured Transports</h2>
          <a href="/transports" className="text-blue-600 hover:underline">
            View all →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredTransports.map(trans => (
            <TransportCard key={trans.id} transport={trans} />
          ))}
        </div>
      </section>

      {/* Quick Search */}
      <section className="bg-gray-50 rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Find Your Perfect Trip</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <input
            type="text"
            placeholder="Where to?"
            className="border rounded px-4 py-3"
          />
          <input
            type="date"
            className="border rounded px-4 py-3"
          />
          <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
            Search
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;