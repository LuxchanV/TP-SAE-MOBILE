import axios from "axios";

// iPhone / téléphone physique
const BASE_URL = "http://192.168.1.16:8080/api";

// Web sur le PC
// const BASE_URL = "http://localhost:8080/api";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export default api;