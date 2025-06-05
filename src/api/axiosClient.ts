import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("Response error:", error);
    if (error.response && error.response.status === 401) {
      // Clear any authentication data
      localStorage.removeItem("access_token");
      // Redirect to signin page
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
