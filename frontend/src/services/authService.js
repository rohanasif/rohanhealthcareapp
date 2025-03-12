import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      if (error.response.status === 401) {
        // Unauthorized - clear token and redirect to login
        Cookies.remove("token");
        if (
          typeof window !== "undefined" &&
          !window.location.pathname.startsWith("/auth/")
        ) {
          window.location.href = "/auth/signin";
        }
      }
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // Request made but no response
      return Promise.reject({
        message: "No response from server. Please check your connection.",
      });
    } else {
      // Request setup error
      return Promise.reject({
        message: "Failed to make request. Please try again.",
      });
    }
  },
);

const authService = {
  async register(userData) {
    try {
      const response = await api.post("/api/auth/register", userData);
      return response.data;
    } catch (error) {
      throw error.message || "Registration failed";
    }
  },

  async login(email, password) {
    try {
      const response = await api.post("/api/auth/login", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error.message || "Login failed";
    }
  },

  async handleSocialAuthCallback(token) {
    try {
      const response = await api.post("/api/auth/verify-token", { token });
      return response.data;
    } catch (error) {
      throw error.message || "Social authentication failed";
    }
  },

  async verifyToken(token) {
    try {
      const response = await api.post("/api/auth/verify-token", { token });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Token verification failed";
    }
  },

  getAuthHeader() {
    const token = Cookies.get("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
};

export default authService;
