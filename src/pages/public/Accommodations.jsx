import { useState, useEffect } from "react";
import { accommodationAPI } from "../../api/accommodation.api";
import { useAuthHook } from "../../hooks/useAuth";
import AccommodationBookingForm from "../../components/accommodation/AccommodationBookingForm";
import { useNavigate } from "react-router-dom";
import { Hotel, Loader2, MapPin, Users, CheckCircle, XCircle, Search } from "lucide-react";

const Accommodations = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);
  const { isAuthenticated, user } = useAuthHook();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAccommodations();
  }, []);

  const fetchAccommodations = async () => {
    try {
      const response = await accommodationAPI.getAll();
      setAccommodations(response.data || []);
    } catch (error) {
      console.error("Error fetching accommodations:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAccommodations = accommodations.filter(
    (acc) =>
      acc.title.toLowerCase().includes(filter.toLowerCase()) ||
      acc.location.toLowerCase().includes(filter.toLowerCase()),
  );

  const handleBookClick = (accommodation) => {
    if (!isAuthenticated) {
      navigate(`/register?redirect=/accommodations`);
      return;
    }
    if (user?.role !== "tourist") {
      alert(
        "Only travelers can book accommodations. Please sign up as a traveler.",
      );
      return;
    }
    setSelectedAccommodation(accommodation);
  };

  const handleCloseModal = () => {
    setSelectedAccommodation(null);
  };

  const handleBookingSuccess = () => {
    handleCloseModal();
    alert("Booking successful! You can view your bookings in the dashboard.");
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <Loader2 className="inline-block animate-spin w-12 h-12 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Safari Accommodations
          </h1>
          <p className="text-xl text-gray-600">
            Find your perfect place to stay
          </p>
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
          <p className="text-gray-600">
            Showing {filteredAccommodations.length} accommodations
          </p>
        </div>

        {/* Accommodations Grid */}
        {filteredAccommodations.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAccommodations.map((accommodation) => (
              <div
                key={accommodation.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition"
              >
                {/* Image Section */}
                <div className="h-56 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white">
                  <Hotel className="w-20 h-20" />
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {accommodation.title}
                  </h3>
                  <p className="text-gray-600 mb-4 flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> {accommodation.location}
                  </p>

                  {/* Description */}
                  <p className="text-gray-700 mb-4 line-clamp-2">
                    {accommodation.description}
                  </p>

                  {/* Amenities */}
                  <div className="mb-4 space-y-2 text-sm text-gray-600">
                    <p className="flex items-center gap-2">
                      <Users className="w-4 h-4" /> Capacity:{" "}
                      <span className="font-semibold">
                        {accommodation.capacity} guests
                      </span>
                    </p>
                    <p className="inline-block">
                      {accommodation.available ? (
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold inline-flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Available
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold inline-flex items-center gap-1">
                          <XCircle className="w-3 h-3" /> Not Available
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Price and Action */}
                  <div className="border-t pt-4 flex justify-between items-center">
                    <span className="text-3xl font-bold text-blue-600">
                      ${accommodation.price_per_night}
                    </span>
                    <span className="text-sm text-gray-500">per night</span>
                  </div>

                  {/* Book Button */}
                  <button
                    onClick={() => handleBookClick(accommodation)}
                    className="w-full mt-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition"
                  >
                    {isAuthenticated && user?.role === "tourist"
                      ? "Book Now"
                      : "View Details & Book"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg p-12 text-center">
            <Search className="w-24 h-24 mb-4 mx-auto text-gray-400" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No accommodations found
            </h3>
            <p className="text-gray-600">Try adjusting your search filters</p>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {selectedAccommodation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {selectedAccommodation.title}
                  </h2>
                  <p className="text-gray-600 flex items-center gap-2 mt-1">
                    📍 {selectedAccommodation.location}
                  </p>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="mb-6">
                <p className="text-gray-700 mb-4">
                  {selectedAccommodation.description}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Capacity</p>
                    <p className="font-semibold">
                      {selectedAccommodation.capacity} guests
                    </p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Price</p>
                    <p className="font-semibold text-blue-600">
                      ${selectedAccommodation.price_per_night}/night
                    </p>
                  </div>
                </div>
              </div>

              {isAuthenticated && user?.role === "tourist" ? (
                <AccommodationBookingForm
                  accommodation={selectedAccommodation}
                  onSuccess={handleBookingSuccess}
                />
              ) : (
                <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg text-center">
                  <p className="text-blue-900 font-semibold mb-4">
                    {!isAuthenticated
                      ? "Please sign in to book this accommodation"
                      : "Only travelers can book accommodations"}
                  </p>
                  <button
                    onClick={() =>
                      navigate(`/register?redirect=/accommodations`)
                    }
                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                  >
                    Sign Up as Traveler
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accommodations;
