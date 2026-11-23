import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const savedAuthentication = localStorage.getItem("bookwiseAuth");

  if (savedAuthentication) {
    const parsed = JSON.parse(savedAuthentication);

    if (parsed.token) {
      config.headers.Authorization = `Bearer ${parsed.token}`;
    }
  }

  return config;
});

export function getErrorMessage(error) {
  return (
    error.response?.data?.message ||
    error.message ||
    "An unexpected error occurred."
  );
}

export default api;