import apiClient from '../services/api-client';

export const performLogout = async () => {
    try {
      const response = await apiClient.post('/auth/logout', { withCredentials: true });

      if (response.status === 200) {
        return response.data.access;
      }
    } catch (error) {
      console.error(error);
    }
};

const useLogout = () => {
  return performLogout;
};

export default useLogout;

