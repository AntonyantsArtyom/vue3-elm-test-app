import axios from "axios";

const baseApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

baseApi.interceptors.request.use((config) => {
  config.params = {
    ...(config.params || {}),
    key: import.meta.env.VITE_API_KEY,
  };
  return config;
});

export default baseApi;
