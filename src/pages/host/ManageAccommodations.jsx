import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuthHook } from "../../hooks/useAuth";
import { accommodationAPI } from "../../api/accommodation.api";
import { bookingAPI } from "../../api/booking.api";
import AccommodationForm from "../../components/accommodation/AccommodationForm";
import { Loader2, Hotel, MapPin, Trash2 } from "lucide-react";

const ManageAccommodations = () => {
  const { user } = useAuthHook();
  const [accommodations, setAccommodations] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);
  const [activeTab, setActiveTab] = useState("listings");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [accResponse, bookingResponse] = await Promise.all([
        accommodationAPI.getAll(),
        bookingAPI.getAccommodationBookings(),
      ]);
      // Filter to only show user's accommodations
      const userAccommodations = (accResponse.data || []).filter(
        (acc) => acc.host_id === user?.id || acc.host?.id === user?.id,
      );
      setAccommodations(userAccommodations);
      setBookings(bookingResponse.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccommodationCreated = () => {
    setShowForm(false);
    fetchData();
  };

  const handleDeleteAccommodation = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"? This will also delete all associated bookings.`)) {
      try {
        await accommodationAPI.delete(id);
        toast.success("Accommodation deleted successfully");
        fetchData();
      } catch (error) {
        console.error("Error deleting accommodation:", error);
        toast.error("Failed to delete accommodation");
      }
    }
  };

  const handleViewBookings = (accommodation) => {
    setSelectedAccommodation(accommodation);
    setActiveTab("bookings");
  };

  const getAccommodationBookings = (accommodationId) => {
    return bookings.filter(
      (b) =>
        b.accommodation_id === accommodationId ||
        b.accommodation?.id === accommodationId,
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Manage Your Accommodations
        </h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          {showForm ? "Cancel" : "+ Add New Accommodation"}
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 border-b">
        <button
          onClick={() => setActiveTab("listings")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "listings"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Your Listings ({accommodations.length})
        </button>
        <button
          onClick={() => setActiveTab("bookings")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "bookings"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Recent Bookings
        </button>
      </div>

      {/* Create Form */}
      {showForm && (
        <div className="mb-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Add New Accommodation</h2>
          <AccommodationForm onSuccess={handleAccommodationCreated} />
        </div>
      )}

      {/* Bookings View */}
      {activeTab === "bookings" && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">
            Your Accommodation Bookings
          </h2>
          {accommodations.length === 0 ? (
            <div className="text-center py-12 text-gray-600">
              <p className="text-xl">You don't have any accommodations yet.</p>
              <button
                onClick={() => setShowForm(true)}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Your First Accommodation
              </button>
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-12 text-gray-600">
              <p className="text-xl">
                No bookings yet for your accommodations.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="border rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">Booking #{booking.id}</p>
                    <p className="text-gray-600">
                      {new Date(booking.check_in_date).toLocaleDateString()} -{" "}
                      {new Date(booking.check_out_date).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600">
                      Total: ${booking.total_price}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Listings View */}
      {activeTab === "listings" && (
        <>
          {accommodations.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <Hotel className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                No Accommodations Yet
              </h2>
              <p className="text-gray-600 mb-6">
                Start listing your properties to attract travelers
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Add Your First Accommodation
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accommodations.map((acc) => (
                <div
                  key={acc.id}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition"
                >
                  <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white">
                    <Hotel className="w-20 h-20" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {acc.title}
                    </h3>
                    <p className="text-gray-600 mb-2 flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> {acc.location}
                    </p>
                    <p className="text-gray-700 mb-4 line-clamp-2">
                      {acc.description}
                    </p>

                    <div className="flex justify-between items-center mb-4">
                      <span className="text-blue-600 font-bold">
                        ${acc.price_per_night}/night
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          acc.available
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {acc.available ? "Available" : "Unavailable"}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewBookings(acc)}
                        className="flex-1 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
                      >
                        View Bookings
                      </button>
                      <button
                        onClick={() => {
                          const newAvailable = !acc.available;
                          accommodationAPI
                            .update(acc.id, { available: newAvailable })
                            .then(() => fetchData())
                            .catch((err) =>
                              console.error(
                                "Error updating availability:",
                                err,
                              ),
                            );
                        }}
                        className="flex-1 py-2 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition"
                      >
                        {acc.available ? "Mark Unavailable" : "Mark Available"}
                      </button>
                      <button
                        onClick={() => handleDeleteAccommodation(acc.id, acc.title)}
                        className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                        title="Delete accommodation"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Selected Accommodation Bookings Modal */}
      {selectedAccommodation && activeTab === "bookings" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedAccommodation.title}
                  </h2>
                  <p className="text-gray-600 flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> {selectedAccommodation.location}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedAccommodation(null);
                    setActiveTab("listings");
                  }}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <h3 className="text-lg font-semibold mb-4">
                Bookings for this accommodation
              </h3>

              {getAccommodationBookings(selectedAccommodation.id).length ===
              0 ? (
                <p className="text-gray-600 text-center py-8">
                  No bookings for this accommodation yet.
                </p>
              ) : (
                <div className="space-y-4">
                  {getAccommodationBookings(selectedAccommodation.id).map(
                    (booking) => (
                      <div key={booking.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold">
                              Booking #{booking.id}
                            </p>
                            <p className="text-gray-600">
                              {new Date(
                                booking.check_in_date,
                              ).toLocaleDateString()}{" "}
                              -{" "}
                              {new Date(
                                booking.check_out_date,
                              ).toLocaleDateString()}
                            </p>
                            <p className="text-gray-600">
                              Total: ${booking.total_price}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              booking.status === "confirmed"
                                ? "bg-green-100 text-green-800"
                                : booking.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAccommodations;
