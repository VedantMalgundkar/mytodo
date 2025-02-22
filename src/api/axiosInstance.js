import axios from "axios";

const API_BASE_URL = "https://dummyjson.com"; // Change to your backend URL

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor for automatically attaching tokens (if needed)
// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token"); // Get from local storage
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default axiosInstance;
