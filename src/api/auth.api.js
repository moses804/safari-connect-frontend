import api from "./axios.js";

export const authAPI = {
  // Register new user
  register: async (userData) => {
    try {
      console.log("authAPI.register called with:", userData);
      console.log("API baseURL:", api.defaults.baseURL);
      const response = await api.post("/auth/register", userData);
      console.log("Registration response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Registration API error:", error);
      console.error("Error response:", error.response);
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        "Registration failed";
      const err = new Error(errorMessage);
      err.response = error.response;
      throw err;
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || error.message || "Login failed";
      const err = new Error(errorMessage);
      throw err;
    }
  },

  // Get current user profile
  getProfile: async () => {
    try {
      const response = await api.get("/auth/me");
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || error.message || "Failed to get profile";
      const err = new Error(errorMessage);
      throw err;
    }
  },

  // Update user profile
  updateProfile: async (userData) => {
    try {
      const response = await api.put("/auth/me", userData);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to update profile";
      const err = new Error(errorMessage);
      throw err;
    }
  },

  // Logout (client-side only)
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  // Verify token
  verifyToken: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;

      const response = await api.get("/auth/me");
      return response.data;
    } catch (error) {
      return null;
    }
  },
};
