// src/context/BookingContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { bookingAPI } from "../api/booking.api.js";

const BookingContext = createContext({});

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch bookings on mount
  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const data = await bookingAPI.getAll(); // Fetch all bookings
        setBookings(data);
      } catch (err) {
        setError(err.message || "Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const addBooking = async (bookingData) => {
    try {
      const newBooking = await bookingAPI.create(bookingData);
      setBookings((prev) => [...prev, newBooking]);
      return newBooking;
    } catch (err) {
      throw err;
    }
  };

  const value = {
    bookings,
    loading,
    error,
    setBookings,
    addBooking,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};
