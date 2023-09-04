import { useQuery } from '@tanstack/react-query';
import apiClient from '../services/api-client';
import useLogout from './useLogout';

const fetchRefreshedToken = async () => {
  const response = await apiClient.get('/auth/jwt/refresh/', { withCredentials: true });

  if (response.status === 200) {
    return response.data.access;
  }

  throw new Error('Error refreshing token');
};

const useRefreshToken = () => {
  const logout = useLogout();

  return useQuery(['refreshedToken'], fetchRefreshedToken, {
    onSuccess: (data) => {
      console.log('Token refreshed successfully:', data);
    },
    onError: (error: any) => {
      if (error?.response?.status === 400) {
        logout();
      }
      console.error(error);
    },
  });
};

export default useRefreshToken;
