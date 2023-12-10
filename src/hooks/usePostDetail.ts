import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { Post } from "../entities/post";

const usePostDetail = (id: string) => useQuery<Post, Error>({
  queryKey:['posts', id],
  queryFn: () => 
    apiClient
      .get<Post>(`/content/detail/${id}`)
      .then(res => {
        console.log(res.data); // log the response to the console
        return res.data;
      }),     
      
});

export default usePostDetail;

