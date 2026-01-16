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
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const [accommodationBookings, transportBookings] = await Promise.all([
        bookingAPI.getAccommodationBookings(),
        bookingAPI.getTransportBookings()
      ]);
      
      // Combine both types of bookings
      const allBookings = [
        ...(accommodationBookings.data || []),
        ...(transportBookings.data || [])
      ];
      setBookings(allBookings);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to load bookings");
      console.error("Booking fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const addAccommodationBooking = async (bookingData) => {
    try {
      await bookingAPI.createAccommodationBooking(bookingData);
      await fetchBookings();
    } catch (err) {
      throw err;
    }
  };

  const addTransportBooking = async (bookingData) => {
    try {
      await bookingAPI.createTransportBooking(bookingData);
      await fetchBookings();
    } catch (err) {
      throw err;
    }
  };

  const value = {
    bookings,
    loading,
    error,
    setBookings,
    fetchBookings,
    addAccommodationBooking,
    addTransportBooking,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};
