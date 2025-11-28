// src/plugins/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZjIxYTA1ZmYxZDAwOTYyYTBhMGQ3MWU5YWQ0ODMzYSIsIm5iZiI6MTc1OTI1Mjg2NC4zLCJzdWIiOiI2OGRjMTE4MDlkZmFhMjc5MmRjNzcxMzIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.VcFYXzbXwRU4Zk5uzApdRJLVpdmmi71EaMnROzEaUEQ
 || "https://api.themoviedb.org/3/",
  headers: {
    Authorization: `Bearer ${import.meta.env.eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZjIxYTA1ZmYxZDAwOTYyYTBhMGQ3MWU5YWQ0ODMzYSIsIm5iZiI6MTc1OTI1Mjg2NC4zLCJzdWIiOiI2OGRjMTE4MDlkZmFhMjc5MmRjNzcxMzIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.VcFYXzbXwRU4Zk5uzApdRJLVpdmmi71EaMnROzEaUEQ
}`,
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
