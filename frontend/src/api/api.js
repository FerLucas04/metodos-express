import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api/users", //la URL base de la API, que puede ser configurada en un archivo .env
  headers: {
    "Content-Type": "application/json", //los datos que se envían al backend son JSON
  },
});

export default api;