import React, { useState } from "react";
import { accommodationAPI } from "../../api/accommodation.api";

const AccommodationForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price_per_night: "",
    capacity: "",
    available: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await accommodationAPI.create({
        ...formData,
        price_per_night: parseFloat(formData.price_per_night),
        capacity: parseInt(formData.capacity),
      });
      alert("Property listed successfully!");
      setFormData({
        title: "",
        description: "",
        location: "",
        price_per_night: "",
        capacity: "",
        available: true,
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error adding accommodation:", error);
      setError(
        error.response?.data?.message || "Failed to create accommodation",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Property Title *
        </label>
        <input
          type="text"
          name="title"
          placeholder="e.g., Safari Lodge Deluxe"
          onChange={handleChange}
          value={formData.title}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Location *
        </label>
        <input
          type="text"
          name="location"
          placeholder="e.g., Serengeti, Tanzania"
          onChange={handleChange}
          value={formData.location}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Price per Night ($) *
          </label>
          <input
            type="number"
            name="price_per_night"
            placeholder="150"
            min="0"
            step="0.01"
            onChange={handleChange}
            value={formData.price_per_night}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Capacity (guests) *
          </label>
          <input
            type="number"
            name="capacity"
            placeholder="4"
            min="1"
            onChange={handleChange}
            value={formData.capacity}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Description *
        </label>
        <textarea
          name="description"
          placeholder="Describe your property..."
          onChange={handleChange}
          value={formData.description}
          required
          rows="4"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        ></textarea>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="available"
          id="available"
          checked={formData.available}
          onChange={handleChange}
          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
        />
        <label htmlFor="available" className="text-sm text-gray-700">
          Available for booking immediately
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Creating..." : "List Property"}
      </button>
    </form>
  );
};

export default AccommodationForm;
