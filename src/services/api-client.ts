import axios from "axios";
import { performLogout } from "../hooks/useLogout";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

console.log(import.meta.env)


const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if the request was for the resend_activation endpoint
    if (originalRequest.url === '/auth/users/resend_activation/') {
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await apiClient.post('/auth/jwt/refresh/', {});

        if (res.status === 200) {
          return apiClient(originalRequest);
        } 
      } catch (refreshError) {
        if (axios.isAxiosError(refreshError) && refreshError.response && refreshError.response.status === 400) {
        
          await performLogout();
          window.location.href = '/login'; 
          
        }
      }
      
    }

    return Promise.reject(error);
  }
);

export default apiClient;
