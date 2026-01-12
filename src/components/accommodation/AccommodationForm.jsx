import React, { useState } from "react";
import API from "../../api/axios"; // Assuming Member 1 sets this up

const AccommodationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    price_per_night: "",
    description: "",
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
      const response = await API.post("/accommodations", formData);
      console.log("Success:", response.data);
      alert("Accommodation added successfully!");
      // Reset form
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
    <section>
      <h2>List a New Accommodation</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Property Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Price per Night:</label>
          <input
            type="number"
            name="price_per_night"
            value={formData.price_per_night}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
          />
        </div>

        <button type="submit">List Property</button>
      </form>
    </section>
  );
};

export default AccommodationForm;
