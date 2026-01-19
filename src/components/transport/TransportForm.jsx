import React, { useState } from "react";
import { toast } from "react-toastify";
import { transportAPI } from "../../api/transport.api";

const TransportForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    vehicle_type: "",
    price_per_day: "",
    total_capacity: "",
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
      await transportAPI.create({
        ...formData,
        price_per_day: parseFloat(formData.price_per_day),
        total_capacity: parseInt(formData.total_capacity),
      });
      toast.success("Transport service added successfully!");
      setFormData({
        vehicle_type: "",
        price_per_day: "",
        total_capacity: "",
        available: true,
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error adding transport:", error);
      setError(
        error.response?.data?.message || "Failed to create transport service",
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
          Vehicle Type *
        </label>
        <input
          type="text"
          name="vehicle_type"
          placeholder="e.g., 4x4 Safari Jeep, Mini-bus, SUV"
          onChange={handleChange}
          value={formData.vehicle_type}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Price per Day ($) *
          </label>
          <input
            type="number"
            name="price_per_day"
            placeholder="150"
            min="0"
            step="0.01"
            onChange={handleChange}
            value={formData.price_per_day}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Passenger Capacity *
          </label>
          <input
            type="number"
            name="total_capacity"
            placeholder="7"
            min="1"
            onChange={handleChange}
            value={formData.total_capacity}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="available"
          id="available"
          checked={formData.available}
          onChange={handleChange}
          className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
        />
        <label htmlFor="available" className="text-sm text-gray-700">
          Available for booking immediately
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Creating..." : "List Vehicle"}
      </button>
    </form>
  );
};

export default TransportForm;
