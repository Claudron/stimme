import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";

interface Category {
    id: number;
    name: string;
}

const useCategory = () => useQuery<Category[], Error>({
  queryKey: ['categories'],
  queryFn: () => 
    apiClient
      .get<Category[]>('/content/categories')
      .then(res => {
        console.log(res.data); // log the response to the console
        return res.data;
      }),     
});

export default useCategory;
