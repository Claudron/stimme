import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";

type Audio = {
  id: number;  
  title: string;
  audio_file: string;
};


const useAudioDetail = (id?: string) => useQuery<Audio, Error>({
  queryKey:['audio file', id],
  queryFn: () => 
    apiClient
      .get<Audio>(`/api/content/audio/${id}`)
      .then(res => {
        console.log(res.data); // log the response to the console
        return res.data;
      }),
  enabled: !!id  // Only run the query if the id is defined and truthy     
});

export default useAudioDetail;
