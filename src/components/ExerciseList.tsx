import { useRef, useState } from "react";
import useExercise from "../hooks/useExercise";

interface ExerciseMethod {
  id: number;
  name: string;
  files: {
    range: string;
    direction: string;
    tempo: string;
    file: string;
  }[];
}



const useExerciseList = () => {
  const { data: exercises = [],  } = useExercise();

  const exerciseRef = useRef<HTMLSelectElement>(null);
  const methodRef = useRef<HTMLSelectElement>(null);
  const rangeRef = useRef<HTMLSelectElement>(null);
  const directionRef = useRef<HTMLSelectElement>(null);
  const tempoRef = useRef<HTMLSelectElement>(null);
  const [selectedFile, setSelectedFile] = useState<string>("");

  const getAvailableMethods = (
    exerciseId: number | undefined
  ): ExerciseMethod[] => {
    if (!exerciseId) return [];
    const exercise = exercises.find((ex) => ex.id === exerciseId);
    if (exercise) {
      return exercise.methods;
    }
    return [];
  };

  const getFilesForSelectedMethod = (
    methodId: number | undefined,
    exerciseId: number | undefined
  ) => {
    if (!methodId || !exerciseId) return [];
    const methods = getAvailableMethods(exerciseId);
    const method = methods.find((method) => method.id === methodId);
    return method?.files || [];
  };

  const findSelectedFile = (
    exerciseId: number,
    methodId: number,
    attributes: { range: string; direction: string; tempo: string }
  ) => {
    const files = getFilesForSelectedMethod(methodId, exerciseId);
    return (
      files.find(
        (file) =>
          file.range === attributes.range &&
          file.direction === attributes.direction &&
          file.tempo === attributes.tempo
      )?.file || ""
    );
  };

  const handleSubmit = () => {
    const selectedExercise =
      exerciseRef.current && Number(exerciseRef.current.value);
    const selectedMethod = methodRef.current && Number(methodRef.current.value);
    const attributes = {
      range: rangeRef.current?.value || "",
      direction: directionRef.current?.value || "",
      tempo: tempoRef.current?.value || "",
    };

    if (selectedExercise && selectedMethod) {
      const file = findSelectedFile(
        selectedExercise,
        selectedMethod,
        attributes
      );
      setSelectedFile(file);
    }
  };

  const uniqueFileAttributes = (attribute: "range" | "direction" | "tempo") => {
    return Array.from(
      new Set(
        getFilesForSelectedMethod(
          Number(methodRef.current?.value),
          Number(exerciseRef.current?.value)
        ).map((file) => file[attribute])
      )
    );
  };

  return (
    <div>
      <select ref={exerciseRef}>
        <option>Select an Exercise</option>
        {exercises?.map((exercise) => (
          <option key={exercise.id} value={exercise.id}>
            {exercise.name}
          </option>
        ))}
      </select>

      <select ref={methodRef}>
        <option>Select a Method</option>
        {getAvailableMethods(Number(exerciseRef.current?.value || "")).map(
          (method) => (
            <option key={method.id} value={method.id}>
              {method.name}
            </option>
          )
        )}
      </select>

      <select name="range" ref={rangeRef}>
        <option>Select Range</option>
        {uniqueFileAttributes("range").map((range) => (
          <option key={range} value={range}>
            {range}
          </option>
        ))}
      </select>

      <select name="direction" ref={directionRef}>
        <option>Select Direction</option>
        {uniqueFileAttributes("direction").map((direction) => (
          <option key={direction} value={direction}>
            {direction}
          </option>
        ))}
      </select>

      <select name="tempo" ref={tempoRef}>
        <option>Select Tempo</option>
        {uniqueFileAttributes("tempo").map((tempo) => (
          <option key={tempo} value={tempo}>
            {tempo}
          </option>
        ))}
      </select>

      <button onClick={handleSubmit}>Fetch File</button>

      <div>{selectedFile && <audio controls src={selectedFile} />}</div>
    </div>
  );
};

export default useExerciseList;
