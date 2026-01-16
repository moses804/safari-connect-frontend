import api from './axios';

export const bookingAPI = {
  // Accommodation bookings
  createAccommodationBooking: (bookingData) => api.post('/accommodation_bookings', bookingData),
  getAccommodationBookings: () => api.get('/accommodation_bookings'),
  getAccommodationBookingById: (id) => api.get(`/accommodation_bookings/${id}`),
  cancelAccommodationBooking: (id) => api.delete(`/accommodation_bookings/${id}`),
  
  // Transport bookings
  createTransportBooking: (bookingData) => api.post('/transport_bookings', bookingData),
  getTransportBookings: () => api.get('/transport_bookings'),
  getTransportBookingById: (id) => api.get(`/transport_bookings/${id}`),
  cancelTransportBooking: (id) => api.delete(`/transport_bookings/${id}`)
};