import { useMutation } from '@tanstack/react-query';
import apiClient from '../services/api-client';

interface ChangeEmailData {
    email: string;
}

const changeEmail = async (emailData: ChangeEmailData) => {
    console.log(emailData);

  const response = await apiClient.patch('/auth/users/me/', emailData, { withCredentials: true });

  console.log(response); 

  if (response.status === 204 || response.status === 200) {
    return true;
  }

  throw new Error('Error changing email');
}

const useChangeEmail = () => {
  return useMutation<boolean, Error, ChangeEmailData>({
    mutationFn: changeEmail,
    onError: (error) => console.error(error),
  });
}

export default useChangeEmail;
