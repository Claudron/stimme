import { useMutation } from '@tanstack/react-query';
import apiClient from '../services/api-client';

interface ChangePasswordData {
  current_password: string;
  new_password: string;
}

const changePassword = async (passwordData: ChangePasswordData) => {
  const response = await apiClient.post('/auth/users/set_password/', passwordData, { withCredentials: true });

  if (response.status === 204) {
    return true;
  }

  if (response.data) {
    throw new Error(response.data.detail);
  }

  throw new Error('Error changing password');
}

const useChangePassword = () => {
  return useMutation<boolean, Error, ChangePasswordData>({
    mutationFn: changePassword,
    onError: (error) => console.error(error),
  });
}

export default useChangePassword;
