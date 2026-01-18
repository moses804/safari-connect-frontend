import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { accommodationAPI } from "../../api/accommodation.api";
import { transportAPI } from "../../api/transport.api";
import { useAuthHook } from "../../hooks/useAuth";

const Home = () => {
  const [featuredAccommodations, setFeaturedAccommodations] = useState([]);
  const [featuredTransports, setFeaturedTransports] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuthHook();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [accResponse, transResponse] = await Promise.all([
        accommodationAPI.getAll(),
        transportAPI.getAll(),
      ]);
      setFeaturedAccommodations(accResponse.data.slice(0, 3) || []);
      setFeaturedTransports(transResponse.data.slice(0, 3) || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBrowseClick = (destination) => {
    if (!isAuthenticated) {
      // Redirect to signup with the intended destination
      navigate(`/register?redirect=${destination}`);
    } else {
      navigate(destination);
    }
  };

  const features = [
    {
      icon: "🏨",
      title: "Premium Stays",
      description: "Curated accommodations for your safari",
    },
    {
      icon: "🚌",
      title: "Safe Transport",
      description: "Reliable and comfortable transportation",
    },
    {
      icon: "💰",
      title: "Best Prices",
      description: "Competitive rates on all bookings",
    },
    {
      icon: "🌟",
      title: "Great Reviews",
      description: "Trusted by thousands of travelers",
    },
  ];

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="inline-block animate-spin text-4xl">⏳</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Plan Your Perfect <span className="text-blue-600">Safari</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Book accommodations and transportation for unforgettable African
              safari experiences. Connect with local hosts and drivers for
              authentic adventures.
            </p>
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => handleBrowseClick("/accommodations")}
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Browse Accommodations
              </button>
              <button
                onClick={() => handleBrowseClick("/transports")}
                className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition"
              >
                Find Transport
              </button>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg p-8 text-white flex items-center justify-center min-h-80">
            <div className="text-center">
              <div className="text-9xl mb-4">🦁</div>
              <p className="text-xl font-semibold">Experience the wild</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20 border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Why Choose SafariConnect?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200 hover:shadow-lg transition"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Accommodations */}
      {featuredAccommodations.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">
            Featured Accommodations
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {featuredAccommodations.map((accommodation) => (
              <div
                key={accommodation.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition"
              >
                <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white text-4xl">
                  🏨
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {accommodation.title}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    📍 {accommodation.location}
                  </p>
                  <p className="text-gray-700 mb-4 line-clamp-2">
                    {accommodation.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">
                      ${accommodation.price_per_night}/night
                    </span>
                    <Link
                      to="/accommodations"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              to="/accommodations"
              className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              View All Accommodations
            </Link>
          </div>
        </section>
      )}

      {/* Featured Transports */}
      {featuredTransports.length > 0 && (
        <section className="bg-gray-50 py-20 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-12">
              Featured Transports
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {featuredTransports.map((transport) => (
                <div
                  key={transport.id}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition"
                >
                  <div className="h-48 bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center text-white text-4xl">
                    🚌
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {transport.vehicle_type}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      👥 Capacity: {transport.total_capacity} seats
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-green-600">
                        ${transport.price_per_day}/day
                      </span>
                      <Link
                        to="/transports"
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link
                to="/transports"
                className="inline-block px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
              >
                View All Transports
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of travelers exploring Africa with SafariConnect
          </p>
          <Link
            to="/register"
            className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
