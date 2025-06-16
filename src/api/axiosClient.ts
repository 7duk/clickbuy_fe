import axios from "axios";
import { refreshToken } from "./authApi";
import type { LoginResponse } from "./authApi";
import type { ApiResponse } from "../helpers/data";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Variable to store the refresh token promise
let refreshTokenPromise: Promise<ApiResponse<LoginResponse>> | null = null;

// Request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token && !config.url?.includes("/auth/refresh-token")) {
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
  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest.url?.includes("/auth/login")) {
      // Check if error is 401 and we haven't tried to refresh the token for this request yet
      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        try {
          // If there's already a refresh token request in progress, wait for it
          if (!refreshTokenPromise) {
            // Create a new refresh token promise if none exists
            refreshTokenPromise = refreshToken(
              localStorage.getItem("access_token") || ""
            ).finally(() => {
              // Clear the promise when it's done (success or failure)
              refreshTokenPromise = null;
            });
          }

          // Wait for the current refresh token promise to resolve
          const res = await refreshTokenPromise;

          if (res.code === 200) {
            // Update token in localStorage
            localStorage.setItem("access_token", res.data?.access_token || "");

            // Update Authorization header for the original request
            originalRequest.headers.Authorization = `Bearer ${res.data?.access_token}`;

            // Retry the original request with the new token
            return axiosClient(originalRequest);
          } else {
            // If refresh token fails, redirect to signin
            localStorage.removeItem("access_token");
            localStorage.removeItem("user_id");
            window.location.href = "/signin";
          }
        } catch (refreshError) {
          // Handle refresh token error
          console.error("Error refreshing token:", refreshError);
          localStorage.removeItem("access_token");
          localStorage.removeItem("user_id");
          window.location.href = "/signin";
        }
      }

      return Promise.reject(error);
    }
  }
);

export default axiosClient;
