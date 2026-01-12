import React, { useState } from "react";
import API from "../../api/axios";

const TransportForm = () => {
  const [formData, setFormData] = useState({
    vehicle_make: "",
    vehicle_type: "", // e.g., SUV, Van, Motorcycle
    capacity: "",
    price_per_km: "",
    image_url: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/transports", formData);
      console.log("Success:", response.data);
      alert("Transport service added successfully!");
      setFormData({
        vehicle_make: "",
        vehicle_type: "",
        capacity: "",
        price_per_km: "",
        image_url: "",
      });
    } catch (error) {
      console.error("Error adding transport:", error);
    }
  };

  return (
    <section>
      <h2>Register a New Transport Service</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Vehicle Make/Model:</label>
          <input
            type="text"
            name="vehicle_make"
            value={formData.vehicle_make}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Vehicle Type:</label>
          <input
            type="text"
            name="vehicle_type"
            value={formData.vehicle_type}
            onChange={handleChange}
            placeholder="e.g. 4x4, Mini-bus"
            required
          />
        </div>

        <div>
          <label>Passenger Capacity:</label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Price per KM:</label>
          <input
            type="number"
            name="price_per_km"
            value={formData.price_per_km}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Vehicle Image URL:</label>
          <input
            type="text"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
          />
        </div>

        <button type="submit">List Vehicle</button>
      </form>
    </section>
  );
};

export default TransportForm;
