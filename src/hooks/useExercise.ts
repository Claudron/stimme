import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";

export interface Files {
  range: string;
  direction: string;
  tempo: string;
  file: string;
}


interface ExerciseMethod {
  id: number;
  name: string;
  files:Files[]
}

interface Exercise {
  id: number;
  name: string;
  methods: ExerciseMethod[];
}

const useExercise = () => useQuery<Exercise[], Error>({
  queryKey: ['Exercise List'],
  queryFn: () => 
    apiClient
      .get<Exercise[]>('/practice/exercises/')
      .then(res => {
        console.log(res.data); 
        return res.data;
      }),     
});

export default useExercise;
