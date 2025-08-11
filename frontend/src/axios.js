import axios from "axios";

// Create Axios instance with default config
const axiosInstance = axios.create({
  baseURL: "https://stock-stunna-4cfe4c578d34.herokuapp.com/", // your API base URL
  withCredentials: true, // include cookies for every request
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor (optional, e.g. add auth header if you store token in memory/localStorage)
axiosInstance.interceptors.request.use(
  (config) => {
    // You can attach tokens here if needed, e.g.
    // const token = localStorage.getItem("access_token");
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh on 401
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry // prevent infinite loop
    ) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh token
        await axiosInstance.post("/token/refresh/");

        // Retry the original request after refresh
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh token failed, logout user or redirect to login page
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
