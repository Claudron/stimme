import { useMutation } from '@tanstack/react-query';
import apiClient from '../services/api-client';

interface Email {
    email: string;
  }

const resetPassword = async (data: Email) => {


    const response = await apiClient.post("/auth/users/reset_password/", data);
        console.log(response.data);

  if (response.status === 204) { 
    return response.data;
  }
  
  // if there's data and it contains a 'detail' field, throw an error with it
  if (response.data && response.data.detail) {
    throw new Error(response.data.detail);
  } 
  
  // if there's data but it doesn't contain a 'detail' field, throw an error with the whole data
  else if (response.data) {
    throw new Error(JSON.stringify(response.data));
  }

  // if there's neither a 204 status nor data, throw a general error
  throw new Error('Error resetting password');
};

export const useRequestResetPassword = () => {

  return useMutation({
    mutationFn: resetPassword,
    onError: (error: any) => {
      console.error("Error resending activation email:", error);
    },
  });
};