import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import apiClient from '../services/api-client';
import axios from 'axios';

interface ActivationData {
  uid: string;
  token: string;
}

const activateUser = async (activationData: ActivationData) => {
  try {
    const response = await apiClient.post('/auth/users/activation/', activationData);
    return response.data;
  } catch (error) {
    // Check if error is AxiosError and get the server response error
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.detail);
    }
    // If error is not AxiosError, re-throw it
    throw error;
  }
};

const useActivateUser = (options?: UseMutationOptions<any, Error, ActivationData>) => {
  return useMutation<any, Error, ActivationData>(activateUser, {
    retry: 3,  
    ...options, 
  });
};

export default useActivateUser;
