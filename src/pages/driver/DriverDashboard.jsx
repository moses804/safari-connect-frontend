import React, { useState, useEffect } from "react";
import API from "../../api/axios";
import TransportForm from "../../components/transport/TransportForm";

const DriverDashboard = () => {
  const [myTransports, setMyTransports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  if (loading) return <p>Loading Driver Dashboard...</p>;

  return (
    <main>
      <h1>Driver Management Dashboard</h1>

      <section>
        <TransportForm />
      </section>

      <hr />

      <section>
        <h2>Your Registered Vehicles</h2>
        {myTransports.length === 0 ? (
          <p>No vehicles listed yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Vehicle</th>
                <th>Type</th>
                <th>Capacity</th>
                <th>Price/KM</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myTransports.map((car) => (
                <tr key={car.id}>
                  <td>{car.vehicle_make}</td>
                  <td>{car.vehicle_type}</td>
                  <td>{car.capacity} Seats</td>
                  <td>${car.price_per_km}</td>
                  <td>
                    <button onClick={() => handleDelete(car.id)}>Remove</button>
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

export default DriverDashboard;
