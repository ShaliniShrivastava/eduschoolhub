
import axios from "axios";

// API configuration
const API_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Separate instance prevents refresh requests from triggering
// the same response interceptor recursively.
const refreshClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let refreshPromise = null;

apiClient.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest || error.response?.status !== 401) {
      return Promise.reject(error);
    }

    const requestUrl = originalRequest.url || "";

    const excludedUrls = [
      "/auth/login",
      "/auth/super-admin/login",
      "/auth/google/login",
      "/auth/google/register",
      "/google-auth/super-admin",
      "/auth/refresh",
      "/auth/logout",
    ];

    if (
      originalRequest._retry ||
      excludedUrls.some((url) => requestUrl.includes(url))
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = refreshClient
          .post("/auth/refresh")
          .finally(() => {
            refreshPromise = null;
          });
      }

      await refreshPromise;

      return apiClient(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  }
);

export default apiClient;
