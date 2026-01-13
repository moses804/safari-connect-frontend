import React, { useState } from "react";
// Updated path: go up two levels to reach src/api/axios
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
      // Ensure the endpoint matches your backend route
      const response = await API.post("/transports", formData);
      console.log("Success:", response.data);
      alert("Transport service added successfully!");

      // Reset form
      setFormData({
        vehicle_make: "",
        vehicle_type: "",
        capacity: "",
        price_per_km: "",
        image_url: "",
      });

      // Optional: If you want the dashboard to refresh automatically,
      // you could add a window.location.reload() or pass a refresh function as a prop
    } catch (error) {
      console.error("Error adding transport:", error);
      alert("Failed to add transport. Please try again.");
    }
  };

  return (
    <section className="form-container">
      <h2 className="text-lg font-bold mb-4">
        Register a New Transport Service
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="font-medium">Vehicle Make/Model:</label>
          <input
            className="border p-2 rounded"
            type="text"
            name="vehicle_make"
            value={formData.vehicle_make}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium">Vehicle Type:</label>
          <input
            className="border p-2 rounded"
            type="text"
            name="vehicle_type"
            value={formData.vehicle_type}
            onChange={handleChange}
            placeholder="e.g. 4x4, Mini-bus"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium">Passenger Capacity:</label>
          <input
            className="border p-2 rounded"
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium">Price per KM:</label>
          <input
            className="border p-2 rounded"
            type="number"
            name="price_per_km"
            value={formData.price_per_km}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium">Vehicle Image URL:</label>
          <input
            className="border p-2 rounded"
            type="text"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
        >
          List Vehicle
        </button>
      </form>
    </section>
  );
};

export default TransportForm;
