import api from "./axios";

export const bookingAPI = {
  // Accommodation bookings
  createAccommodationBooking: (bookingData) =>
    api.post("/accommodation_bookings", bookingData),
  getAccommodationBookings: () => api.get("/accommodation_bookings"),
  getAccommodationBookingById: (id) => api.get(`/accommodation_bookings/${id}`),
  updateAccommodationBooking: (id, data) =>
    api.patch(`/accommodation_bookings/${id}`, data),
  cancelAccommodationBooking: (id) =>
    api.delete(`/accommodation_bookings/${id}`),

  // Transport bookings
  createTransportBooking: (bookingData) =>
    api.post("/transport_bookings", bookingData),
  getTransportBookings: () => api.get("/transport_bookings"),
  getTransportBookingById: (id) => api.get(`/transport_bookings/${id}`),
  updateTransportBooking: (id, data) =>
    api.patch(`/transport_bookings/${id}`, data),
  cancelTransportBooking: (id) => api.delete(`/transport_bookings/${id}`),

  // Host-specific endpoints
  getHostAccommodationBookings: (accommodationId) =>
    api.get(`/host/accommodations/${accommodationId}/bookings`),
  getAllHostBookings: () => api.get("/host/bookings"),

  // Driver-specific endpoints
  getDriverTransportBookings: (transportId) =>
    api.get(`/driver/transports/${transportId}/bookings`),
  getAllDriverBookings: () => api.get("/driver/bookings"),
};
