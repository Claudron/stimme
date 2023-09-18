import { Box, Grid, GridItem, useToast } from "@chakra-ui/react";
import AudioPlayer from "../components/AudioPlayer";
import ExerciseSelector from "../components/ExerciseSelector";
import Playlist from "../components/Playlist";
import usePlaylistStore from "../store/useExerciseStore";
import useSaveExercisePlaylist from "../hooks/useSaveExercisePlaylist";
import useLoadExercisePlaylist from "../hooks/useLoadExercisePlaylist";
import { useEffect, useState } from "react";

interface Playlist {
  playlist: File[];
}

const PracticePage = () => {
  const playlist = usePlaylistStore((state) => state.playlist);
  const savePlaylistMutation = useSaveExercisePlaylist();
  const { data: loadedPlaylist } = useLoadExercisePlaylist();
  const toast = useToast();

  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (loadedPlaylist) {
        usePlaylistStore.getState().loadPlaylist(loadedPlaylist.playlist);
        setIsInitialLoad(false);
    }
  }, [loadedPlaylist]);

  useEffect(() => {
    if (!isInitialLoad) {
        console.log("Playlist has changed:", playlist);
        savePlaylistMutation.mutate({ playlist });
    }
  }, [playlist]);

  useEffect(() => {
    if (savePlaylistMutation.isError) {
      toast({
        title: "Error saving playlist.",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom-left",
        size: "sm"
      });
    } else if (savePlaylistMutation.isSuccess) {
      toast({
        title: "Playlist saved successfully!",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom-left",
        size: "sm"
      });
    }
  }, [savePlaylistMutation.status]);

  return (
    <Grid>
      <GridItem display="flex" alignItems="center" justifyContent="center">
        <AudioPlayer playlist={playlist} />
      </GridItem>
      <GridItem
        display="flex"
        alignItems="center"
        justifyContent="center"
        marginBottom={2}
      >
        <ExerciseSelector />
      </GridItem>
      <GridItem display="flex" alignItems="center" justifyContent="center">
        <Box height="calc(100vh - 150px)" overflowY="auto">
          <Playlist />
        </Box>
      </GridItem>
    </Grid>
  );
};

export default PracticePage;
