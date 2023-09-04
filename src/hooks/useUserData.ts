import { useQuery } from '@tanstack/react-query';
import User from '../entities/user';
import apiClient from '../services/api-client';



const fetchUserData = async () => {
  const response = await apiClient.get<User>('/auth/users/me', { withCredentials: true });

  if (response.status === 200) {
      console.log(response.data)
      return response.data;
  }

  throw new Error('Error fetching user data');
}

const useUserData = () => {

  return useQuery<User, Error>(['userData'], {
      queryFn: fetchUserData,
    
      onError: (error) => console.error(error),
      
  });
}

export default useUserData;



