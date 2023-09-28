import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Switch,
  Text,
  HStack,
  VStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  IconButton,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { FiVolume2 } from "react-icons/fi";
import useExerciseStore, { File } from "../store/useExerciseStore";

type AudioPlayerProps = {
  playlist: File[];
};

const AudioPlayer = ({ playlist }: AudioPlayerProps) => {
  // Set BACKEND_URL based on the environment. In development, it uses VITE_BACKEND_URL from .env.development.
  // In production, it's set to an empty string to use relative paths.
  const BACKEND_URL =
    import.meta.env.MODE === "development"
      ? import.meta.env.VITE_BACKEND_URL
      : "";

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState<boolean>(false);

  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isVolumeOpen, setIsVolumeOpen] = useState(false);

  const { currentTrackIndex, incrementTrackIndex, decrementTrackIndex } =
    useExerciseStore();

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = `${BACKEND_URL}${playlist[currentTrackIndex]?.file}`;
      audioRef.current.load(); // Explicitly load the new source
      console.log("Audio Source:", playlist[currentTrackIndex]?.file);
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  }, [currentTrackIndex, playlist, BACKEND_URL]);

  const playpauseTrack = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        // We don't set the src here; it's set by the useEffect below
        audio.play().catch((error) => {
          console.error("Playback failed:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const playNextTrack = async () => {
    incrementTrackIndex();

    // Only proceed if audioRef is set
    if (audioRef.current) {
      try {
        await audioRef.current.pause(); // Ensure pause is complete
        audioRef.current.currentTime = 0;
        await audioRef.current.play(); // Ensure play is complete
      } catch (error) {
        console.error("Playback failed:", error);
      }
    }
  };

  const playPreviousTrack = () => {
    decrementTrackIndex();
  };

  const handleTrackEnded = () => {
    if (currentTrackIndex === playlist.length - 1) {
      setIsPlaying(false); // Stop playback
    } else if (autoPlayEnabled) {
      playNextTrack();
    } else {
      playpauseTrack();
    }
  };

  const seekTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekPosition = duration * (Number(e.target.value) / 100);
    if (audioRef.current) {
      audioRef.current.currentTime = seekPosition;
    }
  };

  const setVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.volume = Number(e.target.value) / 100;
    }
  };

  return (
    <VStack spacing={4} alignItems="center">
      <HStack spacing={4}>
        <audio
          ref={audioRef}
          onTimeUpdate={() => setCurrentTime(audioRef.current!.currentTime)}
          onLoadedMetadata={() => setDuration(audioRef.current!.duration)}
          onEnded={handleTrackEnded}
          onCanPlayThrough={() => {
            if (autoPlayEnabled) {
              audioRef.current?.play().catch((error) => {
                console.error("Playback failed:", error);
              });
            }
          }}
        />

        <Button onClick={playPreviousTrack}>Previous</Button>
        <Button onClick={playpauseTrack}>{isPlaying ? "Pause" : "Play"}</Button>
        <Button onClick={playNextTrack}>Next</Button>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="autoplay-toggle" mb="0">
            Autoplay
          </FormLabel>
          <Switch
            id="autoplay-toggle"
            isChecked={autoPlayEnabled}
            onChange={(e) => setAutoPlayEnabled(e.target.checked)}
          />
        </FormControl>
      </HStack>

      <HStack>
        <Box width="300px">
          <Text>
            {Math.floor(currentTime / 60)}:
            {Math.floor(currentTime % 60)
              .toString()
              .padStart(2, "0")}
          </Text>

          <Slider
            value={duration ? (currentTime / duration) * 100 : 0}
            onChange={(val: number) =>
              seekTo({
                target: { value: val.toString() },
              } as React.ChangeEvent<HTMLInputElement>)
            }
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>

          <Text>
            {Math.floor(duration / 60)}:
            {Math.floor(duration % 60)
              .toString()
              .padStart(2, "0")}
          </Text>
        </Box>

        <Popover
          isOpen={isVolumeOpen}
          onClose={() => setIsVolumeOpen(false)}
          placement="bottom"
        >
          <PopoverTrigger>
            <IconButton
              aria-label="Volume"
              icon={<FiVolume2 />}
              onClick={() => setIsVolumeOpen(!isVolumeOpen)}
            />
          </PopoverTrigger>
          <PopoverContent>
            <Slider
              defaultValue={100}
              onChange={(val) =>
                setVolume({ target: { value: val.toString() } } as any)
              }
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </PopoverContent>
        </Popover>
      </HStack>
    </VStack>
  );
};

export default AudioPlayer;
