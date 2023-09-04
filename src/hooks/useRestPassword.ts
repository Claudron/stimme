import { useMutation } from '@tanstack/react-query';
import apiClient from '../services/api-client';
import axios from 'axios'; // Make sure to import axios if you are using it in apiClient

interface ResetPasswordData {
  uid: string;
  token: string;
  new_password: string;
  re_new_password: string;
}

const resetPassword = async (resetPasswordData: ResetPasswordData) => {
  try {
    // Make a POST request to reset the password
    const response = await apiClient.post('/auth/users/reset_password_confirm/', resetPasswordData);

    // If the response status is 204, password reset was successful
    if (response.status === 204) {
      return true;
    }

    // Throw a generic error if response status is not 204
    throw new Error('Error changing password');
  } catch (error) {
    // Check if the error is an Axios error and has a response
    if (axios.isAxiosError(error) && error.response) {
      // Extract all error messages from the server response
      const customErrors = error.response.data;

      // Initialize an empty error message string
      let errorMessage = '';

      // Iterate through each key (field) in the error object
      for (const key in customErrors) {
        // If the key has a value (i.e., error messages), concatenate them
        if (customErrors[key]) {
          errorMessage += customErrors[key].join(' ') + ' '; // Join error messages with a space and add a space at the end
        }
      }

      // Trim the extra space from the end of the error message string and throw a new Error
      throw new Error(errorMessage.trim());
    } else {
      // Throw a generic error if it's not an Axios error or doesn't have the expected structure
      throw new Error('Error changing password');
    }
  }
}



const useResetPassword = () => {
  return useMutation<boolean, Error, ResetPasswordData>({
    mutationFn: resetPassword,
    onError: (error) => console.error(error),
  });
}

export default useResetPassword;
