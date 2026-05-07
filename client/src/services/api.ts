import axios from 'axios';
import type { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const isDev = import.meta.env.DEV;

const api = axios.create({
  baseURL: isDev 
    ? 'http://localhost:3000/api/v1' 
    : 'https://futura-api-de-producao.com/api/v1',
  withCredentials: true,
});

// Request
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("@CourseSphere:token");
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (import.meta.env.DEV) {
      console.log(`📤 [${config.method?.toUpperCase()}] ${config.url}`);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("@CourseSphere:token");
      localStorage.removeItem("@CourseSphere:user");
      
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;