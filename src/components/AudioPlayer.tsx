import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  HStack,
  VStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  IconButton,
} from "@chakra-ui/react";
import { FiVolume2 } from "react-icons/fi";
import useExerciseStore, { File } from "../store/useExerciseStore";

type AudioPlayerProps = {
  playlist: File[];
};

const AudioPlayer = ({ playlist }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isVolumeOpen, setIsVolumeOpen] = useState(false);

  const { currentTrackIndex, incrementTrackIndex, decrementTrackIndex } =
    useExerciseStore();

  useEffect(() => {
    if (audioRef.current) {
      console.log("Audio Source:", playlist[currentTrackIndex]?.file);
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  }, [currentTrackIndex, playlist]);

  const playpauseTrack = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const playNextTrack = () => {
    incrementTrackIndex();
  };

  const playPreviousTrack = () => {
    decrementTrackIndex();
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
          src={playlist[currentTrackIndex]?.file}
          onTimeUpdate={() => setCurrentTime(audioRef.current!.currentTime)}
          onLoadedMetadata={() => setDuration(audioRef.current!.duration)}
          onEnded={playpauseTrack}
        />

        <Button onClick={playPreviousTrack}>Previous</Button>
        <Button onClick={playpauseTrack}>{isPlaying ? "Pause" : "Play"}</Button>
        <Button onClick={playNextTrack}>Next</Button>
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
