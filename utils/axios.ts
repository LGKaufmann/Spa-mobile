import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001", // Reemplaza con la URL de tu API
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default instance;
