import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";

interface ExerciseMethod {
    id: number;
    name: string;
    range: string;
    direction: string;
    tempo: string;
    file: string;

}

const useExerciseMethod = () => useQuery<ExerciseMethod[], Error>({
  queryKey: ['Exercise Methods'],
  queryFn: () => 
    apiClient
      .get<ExerciseMethod[]>('/practice/method/')
      .then(res => {
        console.log(res.data); 
        return res.data;
      }),     
});

export default useExerciseMethod;
