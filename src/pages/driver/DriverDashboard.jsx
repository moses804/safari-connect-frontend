import React, { useState, useEffect } from "react";
// Path updated to go up two levels to reach src/api
import API from "../../api/axios";
// Path updated to go up two levels then into components/transport
import TransportForm from "../../components/transport/TransportForm";

const DriverDashboard = () => {
  const [myTransports, setMyTransports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Assuming the backend endpoint remains the same
    API.get("/driver/transports")
      .then((res) => {
        setMyTransports(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching driver listings:", err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this transport listing?")) {
      try {
        await API.delete(`/transports/${id}`);
        setMyTransports(myTransports.filter((item) => item.id !== id));
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  if (loading)
    return (
      <div className="p-4 text-center">
        <p>Loading Driver Dashboard...</p>
      </div>
    );

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Driver Management Dashboard</h1>

      <section className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-2">Add New Transport</h2>
        <TransportForm />
      </section>

      <hr className="my-6" />

      <section>
        <h2 className="text-xl font-semibold mb-4">Your Registered Vehicles</h2>
        {myTransports.length === 0 ? (
          <p className="text-gray-500 italic">No vehicles listed yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border p-2">Vehicle</th>
                  <th className="border p-2">Type</th>
                  <th className="border p-2">Capacity</th>
                  <th className="border p-2">Price/KM</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {myTransports.map((car) => (
                  <tr key={car.id} className="hover:bg-gray-50">
                    <td className="border p-2">{car.vehicle_make}</td>
                    <td className="border p-2">{car.vehicle_type}</td>
                    <td className="border p-2 text-center">
                      {car.capacity} Seats
                    </td>
                    <td className="border p-2 text-center">
                      ${car.price_per_km}
                    </td>
                    <td className="border p-2 text-center">
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                        onClick={() => handleDelete(car.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
};

export default DriverDashboard;
