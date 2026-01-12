import React, { useState, useEffect } from "react";
import API from "../../api/axios";
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

  if (loading) return <p>Loading Dashboard...</p>;

  return (
    <main>
      <h1>Host Management Dashboard</h1>

      <section>
        <AccommodationForm />
      </section>

      <hr />

      <section>
        <h2>Your Current Listings</h2>
        {myAccommodations.length === 0 ? (
          <p>You haven't listed any properties yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myAccommodations.map((acc) => (
                <tr key={acc.id}>
                  <td>{acc.name}</td>
                  <td>{acc.location}</td>
                  <td>${acc.price_per_night}</td>
                  <td>
                    <button onClick={() => handleDelete(acc.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
};

export default HostDashboard;
