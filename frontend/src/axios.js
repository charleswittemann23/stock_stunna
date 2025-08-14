import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://stock-stunna-4cfe4c578d34.herokuapp.com",
  withCredentials: true, // send cookies with every request
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, resolve) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // DON'T try to refresh tokens for login or refresh endpoints
    if (originalRequest.url?.includes('/token/') || originalRequest.url?.includes('/refresh/')) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => axiosInstance(originalRequest))
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise(async (resolve, reject) => {
        try {
          await axiosInstance.post("api/auth/token/refresh/");

          processQueue(null);
          resolve(axiosInstance(originalRequest));
        } catch (err) {
          processQueue(err);
          reject(err);
        } finally {
          isRefreshing = false;
        }
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
