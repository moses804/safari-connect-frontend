import React, { useState, useEffect } from "react";
import { useAuthHook } from "../../hooks/useAuth";
import { transportAPI } from "../../api/transport.api";
import { bookingAPI } from "../../api/booking.api";
import TransportForm from "../../components/transport/TransportForm";
import { Loader2, Bus, Users } from "lucide-react";

const ManageTransports = () => {
  const { user } = useAuthHook();
  const [transports, setTransports] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedTransport, setSelectedTransport] = useState(null);
  const [activeTab, setActiveTab] = useState("listings");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [transResponse, bookingResponse] = await Promise.all([
        transportAPI.getAll(),
        bookingAPI.getTransportBookings(),
      ]);
      // Filter to only show user's transports
      const userTransports = (transResponse.data || []).filter(
        (t) => t.driver_id === user?.id || t.driver?.id === user?.id,
      );
      setTransports(userTransports);
      setBookings(bookingResponse.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTransportCreated = () => {
    setShowForm(false);
    fetchData();
  };

  const handleViewBookings = (transport) => {
    setSelectedTransport(transport);
    setActiveTab("bookings");
  };

  const getTransportBookings = (transportId) => {
    return bookings.filter(
      (b) => b.transport_id === transportId || b.transport?.id === transportId,
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-12 h-12 animate-spin text-green-600" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Manage Your Transport Services
        </h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
        >
          {showForm ? "Cancel" : "+ Add New Transport"}
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 border-b">
        <button
          onClick={() => setActiveTab("listings")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "listings"
              ? "border-b-2 border-green-600 text-green-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Your Vehicles ({transports.length})
        </button>
        <button
          onClick={() => setActiveTab("bookings")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "bookings"
              ? "border-b-2 border-green-600 text-green-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Recent Bookings
        </button>
      </div>

      {/* Create Form */}
      {showForm && (
        <div className="mb-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Add New Transport Service</h2>
          <TransportForm onSuccess={handleTransportCreated} />
        </div>
      )}

      {/* Bookings View */}
      {activeTab === "bookings" && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Your Transport Bookings</h2>
          {transports.length === 0 ? (
            <div className="text-center py-12 text-gray-600">
              <p className="text-xl">
                You don't have any transport services yet.
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Add Your First Transport
              </button>
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-12 text-gray-600">
              <p className="text-xl">No bookings yet for your transports.</p>
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
                      Date: {new Date(booking.travel_date).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600">
                      Seats: {booking.seats_booked} | Total: $
                      {booking.total_price}
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
          {transports.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <Bus className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                No Transport Services Yet
              </h2>
              <p className="text-gray-600 mb-6">
                Start offering transport services to help travelers explore
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
              >
                Add Your First Transport
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {transports.map((trans) => (
                <div
                  key={trans.id}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition"
                >
                  <div className="flex">
                    <div className="w-48 bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center text-white">
                      <Bus className="w-16 h-16" />
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {trans.vehicle_type}
                          </h3>
                          <p className="text-gray-600 flex items-center gap-1">
                            <Users className="w-4 h-4" /> Capacity: {trans.total_capacity} seats
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            trans.available
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {trans.available ? "Available" : "Unavailable"}
                        </span>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-2xl font-bold text-green-600">
                          ${trans.price_per_day}/day
                        </span>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewBookings(trans)}
                            className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
                          >
                            View Bookings
                          </button>
                          <button
                            onClick={() => {
                              const newAvailable = !trans.available;
                              transportAPI
                                .update(trans.id, { available: newAvailable })
                                .then(() => fetchData())
                                .catch((err) =>
                                  console.error(
                                    "Error updating availability:",
                                    err,
                                  ),
                                );
                            }}
                            className="px-4 py-2 border-2 border-green-600 text-green-600 font-semibold rounded-lg hover:bg-green-50 transition"
                          >
                            {trans.available
                              ? "Mark Unavailable"
                              : "Mark Available"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Selected Transport Bookings Modal */}
      {selectedTransport && activeTab === "bookings" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedTransport.vehicle_type}
                  </h2>
                  <p className="text-gray-600 flex items-center gap-1">
                    <Users className="w-4 h-4" /> {selectedTransport.total_capacity} seats
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedTransport(null);
                    setActiveTab("listings");
                  }}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <h3 className="text-lg font-semibold mb-4">
                Bookings for this transport
              </h3>

              {getTransportBookings(selectedTransport.id).length === 0 ? (
                <p className="text-gray-600 text-center py-8">
                  No bookings for this transport yet.
                </p>
              ) : (
                <div className="space-y-4">
                  {getTransportBookings(selectedTransport.id).map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">Booking #{booking.id}</p>
                          <p className="text-gray-600">
                            Date:{" "}
                            {new Date(booking.travel_date).toLocaleDateString()}
                          </p>
                          <p className="text-gray-600">
                            Seats: {booking.seats_booked} | Total: $
                            {booking.total_price}
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
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTransports;
