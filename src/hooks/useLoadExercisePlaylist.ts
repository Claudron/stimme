import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { File } from "../store/useExerciseStore";


interface Playlist {
    playlist: File[];
}

const useLoadExercisePlaylist = () => useQuery<Playlist, Error>({
  queryKey: ['Exercise User Playlist'],
  queryFn: async () => {
    const response = await apiClient.get<Playlist>('/practice/playlist/');
    const data = response.data;

    // If the playlist field exists and is a string, parse it
    if (data && typeof data.playlist === "string") {
      data.playlist = JSON.parse(data.playlist);
    }

    console.log(data);
    return data;
  },     
});


export default useLoadExercisePlaylist;
