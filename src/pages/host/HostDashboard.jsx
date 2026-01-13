import React, { useState, useEffect } from "react";
// Updated path: go up two levels to reach src/api/axios
import API from "../../api/axios";
// Updated path: go up two levels then into components/accommodation
import AccommodationForm from "../../components/accommodation/AccommodationForm";

const HostDashboard = () => {
  const [myAccommodations, setMyAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch only the accommodations belonging to this host
  useEffect(() => {
    API.get("/host/accommodations")
      .then((res) => {
        setMyAccommodations(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching host listings:", err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      try {
        await API.delete(`/accommodations/${id}`);
        // Filter out the deleted item from state to update UI
        setMyAccommodations(myAccommodations.filter((item) => item.id !== id));
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  if (loading)
    return (
      <div className="p-4 text-center">
        <p>Loading Dashboard...</p>
      </div>
    );

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Host Management Dashboard</h1>

      <section className="bg-blue-50 p-4 rounded-lg mb-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Create New Accommodation</h2>
        <AccommodationForm />
      </section>

      <hr className="my-6" />

      <section>
        <h2 className="text-xl font-semibold mb-4">Your Current Listings</h2>
        {myAccommodations.length === 0 ? (
          <p className="text-gray-500 italic">
            You haven't listed any properties yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2 text-left">Name</th>
                  <th className="border p-2 text-left">Location</th>
                  <th className="border p-2 text-left">Price</th>
                  <th className="border p-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {myAccommodations.map((acc) => (
                  <tr key={acc.id} className="hover:bg-gray-50">
                    <td className="border p-2 font-medium">{acc.name}</td>
                    <td className="border p-2">{acc.location}</td>
                    <td className="border p-2">${acc.price_per_night}</td>
                    <td className="border p-2 text-center">
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                        onClick={() => handleDelete(acc.id)}
                      >
                        Delete
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

export default HostDashboard;
