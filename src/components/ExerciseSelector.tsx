import React, { useState, useEffect } from "react";
import useExercise from "../hooks/useExercise";
import { Select, Box, Flex, Button } from "@chakra-ui/react";
import usePlaylistStore from "../store/useExerciseStore";
import { Files } from "../hooks/useExercise";
import { File } from "../store/useExerciseStore";

const ExerciseSelector = () => {
  const { data: exercises } = useExercise();

  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [methods, setMethods] = useState<any[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [ranges, setRanges] = useState<string[]>([]);
  const [selectedRange, setSelectedRange] = useState<string | null>(null); // State to keep track of selected range
  const [directions, setDirections] = useState<string[]>([]); // State to keep track of available directions based on the selected range
  const [selectedDirection, setSelectedDirection] = useState<string | null>(
    null
  );
  const [tempos, setTempos] = useState<string[]>([]); // State to keep track of available tempos based on the selected range and direction
  const [selectedTempo, setSelectedTempo] = useState<string | null>(null);

  const addToPLaylist = usePlaylistStore((s) => s.addToPlaylist);

  useEffect(() => {
    if (selectedExercise) {
      const exercise = exercises?.find((ex) => ex.name === selectedExercise);
      if (exercise) {
        setMethods(exercise.methods);
      }
    } else {
      setMethods([]);
      setSelectedMethod(null);
    }
  }, [selectedExercise, exercises]);

  useEffect(() => {
    if (selectedMethod) {
      const method = methods.find((m) => m.name === selectedMethod);
      const uniqueRanges = [
        ...new Set(method?.files.map((file: Files) => file.range)),
      ] as string[];
      setRanges(uniqueRanges);
    } else {
      setRanges([]);
    }
  }, [selectedMethod, methods]);

  useEffect(() => {
    if (selectedRange) {
      const method = methods.find((m) => m.name === selectedMethod);
      const uniqueDirections = [
        ...new Set(
          method?.files
            .filter((file: Files) => file.range === selectedRange)
            .map((file: Files) => file.direction)
        ),
      ] as string[];
      setDirections(uniqueDirections);
    } else {
      setDirections([]);
    }
  }, [selectedRange, methods]);

  useEffect(() => {
    if (selectedRange && selectedDirection) {
      const method = methods.find((m) => m.name === selectedMethod);
      const uniqueTempos = [
        ...new Set(
          method?.files
            .filter(
              (file: Files) =>
                file.range === selectedRange &&
                file.direction === selectedDirection
            )
            .map((file: Files) => file.tempo)
        ),
      ] as string[];
      setTempos(uniqueTempos);
    } else {
      setTempos([]);
    }
  }, [selectedRange, selectedDirection, methods]);

  const getSelectedFile = (): File | null => {
    if (selectedMethod && selectedRange && selectedDirection && selectedTempo) {
      const method = methods.find((m) => m.name === selectedMethod);
      const fileObj = method?.files.find(
        (file: Files) =>
          file.range === selectedRange &&
          file.direction === selectedDirection &&
          file.tempo === selectedTempo
      );

      if (fileObj) {
        // Find the parent exercise
        const parentExercise = exercises?.find(
          (ex) => ex.name === selectedExercise
        );

        // Add parent exercise information to the file object
        const enhancedFileObj: File = {
          ...fileObj,
          ExerciseName: parentExercise?.name,
          // add any other fields from parentExercise you need here...
          methodName: method.name,
        };

        console.log(enhancedFileObj);
        return enhancedFileObj;
      }
    }
    return null;
  };

  const handleAddToPlaylist = () => {
    const selectedFile = getSelectedFile();
    if (selectedFile) {
      addToPLaylist(selectedFile); // Add the selected file to the playlist
    }
  };

  return (
    <Flex align="center" padding="5" rounded="md" wrap="wrap">
      {/* Exercise Selector */}
      <Box mr="4">
        <Select
          placeholder="Select Exercise"
          value={selectedExercise || ""}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setSelectedExercise(e.target.value)
          }
        >
          {exercises?.map((exercise) => (
            <option key={exercise.id} value={exercise.name}>
              {exercise.name}
            </option>
          ))}
        </Select>
      </Box>

      {/* Method Selector */}
      {selectedExercise && (
        <Box mr="4">
          <Select
            placeholder="Select Method"
            value={selectedMethod || ""}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSelectedMethod(e.target.value)
            }
          >
            {methods.map((method) => (
              <option key={method.id} value={method.name}>
                {method.name}
              </option>
            ))}
          </Select>
        </Box>
      )}

      {/* Range Selector */}
      {selectedMethod && (
        <Box mr="4">
          <Select
            placeholder="Select Range"
            value={selectedRange || ""}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSelectedRange(e.target.value)
            }
          >
            {ranges.map((range, index) => (
              <option key={index} value={range}>
                {range}
              </option>
            ))}
          </Select>
        </Box>
      )}

      {/* Direction Selector */}
      {selectedRange && (
        <Box mr="4">
          <Select
            placeholder="Select Direction"
            value={selectedDirection || ""}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSelectedDirection(e.target.value)
            }
          >
            {directions.map((direction, index) => (
              <option key={index} value={direction}>
                {direction}
              </option>
            ))}
          </Select>
        </Box>
      )}

      {/* Tempo Selector */}
      {selectedDirection && (
        <Box mr="4">
          <Select
            placeholder="Select Tempo"
            value={selectedTempo || ""}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSelectedTempo(e.target.value)
            }
          >
            {tempos.map((tempo, index) => (
              <option key={index} value={tempo}>
                {tempo}
              </option>
            ))}
          </Select>
        </Box>
      )}
      <Button onClick={handleAddToPlaylist}>Add to Playlist</Button>
    </Flex>
  );
};

export default ExerciseSelector;
