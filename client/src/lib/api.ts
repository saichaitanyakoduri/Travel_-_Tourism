import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// API functions for flights
export const flightApi = {
  createBooking: async (bookingData) => {
    const response = await api.post('/bookings/flight', bookingData);
    return response.data;
  },
  getBooking: async (id) => {
    const response = await api.get(`/bookings/flight/${id}`);
    return response.data;
  },
  updateEmailStatus: async (id) => {
    const response = await api.post(`/bookings/flight/${id}/email-sent`);
    return response.data;
  },
};

// API functions for hotels
export const hotelApi = {
  createBooking: async (bookingData) => {
    const response = await api.post('/bookings/hotel', bookingData);
    return response.data;
  },
  getBooking: async (id) => {
    const response = await api.get(`/bookings/hotel/${id}`);
    return response.data;
  },
  updateEmailStatus: async (id) => {
    const response = await api.post(`/bookings/hotel/${id}/email-sent`);
    return response.data;
  },
};

// API functions for buses
export const busApi = {
  createBooking: async (bookingData) => {
    const response = await api.post('/bookings/bus', bookingData);
    return response.data;
  },
  getBooking: async (id) => {
    const response = await api.get(`/bookings/bus/${id}`);
    return response.data;
  },
  updateEmailStatus: async (id) => {
    const response = await api.post(`/bookings/bus/${id}/email-sent`);
    return response.data;
  },
};

// API functions for trains
export const trainApi = {
  createBooking: async (bookingData) => {
    const response = await api.post('/bookings/train', bookingData);
    return response.data;
  },
  getBooking: async (id) => {
    const response = await api.get(`/bookings/train/${id}`);
    return response.data;
  },
  updateEmailStatus: async (id) => {
    const response = await api.post(`/bookings/train/${id}/email-sent`);
    return response.data;
  },
};

// API functions for user profile and history
export const userApi = {
  getProfile: async () => {
    const response = await api.get('/user/profile');
    return response.data;
  },
  getBookingHistory: async () => {
    const response = await api.get('/bookings/history');
    return response.data;
  },
};

// API function for newsletter subscription
export const newsletterApi = {
  subscribe: async (email) => {
    const response = await api.post('/newsletter/subscribe', { email });
    return response.data;
  },
};

export default api;
