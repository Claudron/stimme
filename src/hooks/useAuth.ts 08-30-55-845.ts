import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";



  
const useAuth = () => useQuery({
  queryKey: ['posts'],
  queryFn: () => 
    apiClient
      .post('/auth/jwt/create/')
});

export default useAuth;