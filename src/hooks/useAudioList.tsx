import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";


type Audio = {
    id: number;  
    title: string;
    audio_file: string;
  };


const useAudioList = () => useQuery<Audio[], Error>({
  queryKey:['audio list'],
  queryFn: () => 
    apiClient
      .get<Audio[]>(`/api/content/audio`)
      .then(res => {
        console.log(res.data); // log the response to the console
        return res.data;
      }),     
      
});

export default useAudioList;