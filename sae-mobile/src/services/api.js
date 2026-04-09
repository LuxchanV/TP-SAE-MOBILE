import axios from "axios";

const BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://localhost:8080/api";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export default api;