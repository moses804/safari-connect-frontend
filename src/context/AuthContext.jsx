// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { authAPI } from "../api/auth.api.js";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user from localStorage on initial load
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (token && storedUser) {
        try {
          const verified = await authAPI.verifyToken();
          if (verified) {
            setUser(JSON.parse(storedUser));
          } else {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
          }
        } catch (err) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  // Register function
  const register = async (userData) => {
    setError(null);
    try {
      const user = await authAPI.register(userData);
      // Backend returns just user, no token on registration
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      return user;
    } catch (err) {
      setError(err.message || "Registration failed");
      throw err;
    }
  };

  // Login function
  const login = async (credentials) => {
    setError(null);
    try {
      const data = await authAPI.login(credentials);
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
      }
      return data;
    } catch (err) {
      setError(err.message || "Login failed");
      throw err;
    }
  };

  // Logout function
  const logout = () => {
    authAPI.logout();
    setUser(null);
    setError(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // Update user profile
  const updateUser = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // Check if user has specific role
  const hasRole = (role) => user?.role === role;

  // Check if user has any of the given roles
  const hasAnyRole = (roles) => roles.includes(user?.role);

  const value = {
    user,
    loading,
    error,
    register,
    login,
    logout,
    updateUser,
    hasRole,
    hasAnyRole,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
