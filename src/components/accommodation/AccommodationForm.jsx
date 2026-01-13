import React, { useState } from "react";
import API from "../../api/axios";

const AccommodationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    price_per_night: "",
    description: "",
    image_url: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/accommodations", formData);
      alert("Property listed successfully!");
      setFormData({
        name: "",
        location: "",
        price_per_night: "",
        description: "",
        image_url: "",
      });
    } catch (error) {
      console.error("Error adding accommodation:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        name="name"
        placeholder="Property Name"
        onChange={handleChange}
        value={formData.name}
        required
        className="border p-2 w-full"
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        onChange={handleChange}
        value={formData.location}
        required
        className="border p-2 w-full"
      />
      <input
        type="number"
        name="price_per_night"
        placeholder="Price per night"
        onChange={handleChange}
        value={formData.price_per_night}
        required
        className="border p-2 w-full"
      />
      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
        value={formData.description}
        className="border p-2 w-full"
      ></textarea>
      <input
        type="text"
        name="image_url"
        placeholder="Image URL"
        onChange={handleChange}
        value={formData.image_url}
        className="border p-2 w-full"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white p-2 rounded w-full"
      >
        List Property
      </button>
    </form>
  );
};

export default AccommodationForm;
