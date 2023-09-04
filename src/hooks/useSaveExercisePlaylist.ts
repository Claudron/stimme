import { useMutation } from "@tanstack/react-query";
import Playlist from "../components/Playlist";
import apiClient from "../services/api-client";
import { File } from "../store/useExerciseStore";

interface Playlist {
    playlist: File[] ;
}


const saveExercisePlaylist = async (params: Playlist) => {
    // Serialize the playlist data
    const serializedPlaylist = JSON.stringify(params.playlist);

    // Prepare the request data
    const requestData = {
        playlist: serializedPlaylist
        // If needed, include user data here
    };
    console.log("Sending the following serialized playlist to the server:", serializedPlaylist);

    // Send the serialized data in the POST request
    const response = await apiClient.post('/practice/playlist/', requestData, { withCredentials: true });

    if (response.status === 200 || response.status === 201) {
        return true;
    }
    
    throw new Error('Error saving playlist');
};
   
    
const useSaveExercisePlaylist = () => {
   return useMutation<Boolean, Error, Playlist>({
       mutationFn: saveExercisePlaylist,
       onError: (error) => console.log(error),

   });
}

export default useSaveExercisePlaylist;
