import axios from "axios";

export const API_BASE_URL =
  "https://next-training-dev-api.connectid.cloud/api";
const axiosInstance = axios.create({
  baseURL: "https://next-training-dev-api.connectid.cloud",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("token")
        : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("API ERROR:", error.response);

    return Promise.reject(error);
  }
);

export default axiosInstance;