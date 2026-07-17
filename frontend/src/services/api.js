import axios from "axios";

const api = axios.create({
  baseURL: "https://url-shortner-r2u6.onrender.com/api",
});

export default api;