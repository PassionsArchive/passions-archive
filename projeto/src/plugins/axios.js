// src/plugins/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_TMDB_API_URL || "https://api.themoviedb.org/3/",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erro na requisição:", error);

    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error("Token inválido ou expirado");
          break;
        case 404:
          console.error("Recurso não encontrado");
          break;
        case 500:
          console.error("Erro no servidor TMDB");
          break;
        default:
          console.error("Erro desconhecido");
      }
    } else if (error.request) {
      console.error("Sem resposta do servidor");
    }

    return Promise.reject(error);
  }
);

export default api;
