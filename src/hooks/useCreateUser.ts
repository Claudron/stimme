import { useMutation } from "@tanstack/react-query";
import User from "../entities/user";
import apiClient from "../services/api-client";
import { AxiosError } from 'axios';

interface CreateUser {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
  }
  


const createUser = async (userData:CreateUser) => {
  try {
    const response = await apiClient.post('auth/users/', userData);
    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    const axiosError = error as AxiosError<{password?: string[]}>;
    if (axiosError.response?.data) {
      if (axiosError.response.data.password) {
        throw new Error(axiosError.response.data.password[0]);
      }
      throw new Error('Error creating user');
    }
    throw error;
  }
  };

  const useCreateUser = () => {
    return useMutation<User, Error,CreateUser>({
      mutationFn: createUser,
      onError: (error) => console.error(error),
    });
  };
  
  export default useCreateUser;