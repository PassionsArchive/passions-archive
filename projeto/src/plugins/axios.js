import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZjIxYTA1ZmYxZDAwOTYyYTBhMGQ3MWU5YWQ0ODMzYSIsIm5iZiI6MTc1OTI1Mjg2NC4zLCJzdWIiOiI2OGRjMTE4MDlkZmFhMjc5MmRjNzcxMzIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.VcFYXzbXwRU4Zk5uzApdRJLVpdmmi71EaMnROzEaUEQ
`,
  },
});

export default api;
