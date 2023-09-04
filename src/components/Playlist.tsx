import usePlaylistStore from "../store/useExerciseStore";
import {
  Badge,
  Button,
  Heading,
  List,
  ListItem,
  useTheme,
  Flex,
  VStack,
  Text,
} from "@chakra-ui/react";
import { File } from "../store/useExerciseStore";
import { useEffect } from "react";

const Playlist = () => {
  // const playlist = usePlaylistStore((s) => s.playlist);
  const store = usePlaylistStore();
  const playlist = store.playlist;
  const removeFromPlaylist = usePlaylistStore((s) => s.removeFromPlaylist);
  const currentPlayingIndex = usePlaylistStore(
    (state) => state.currentTrackIndex
  );
  const setCurrentTrackIndex = usePlaylistStore((s) => s.setCurrentTrackIndex); 
  const moveItemUp = usePlaylistStore((s) => s.moveItemUp);
  const moveItemDown = usePlaylistStore((s) => s.moveItemDown);

  const theme = useTheme(); 
  const selectedItemColor = theme.colors.teal[100];
  const LstItemHover = theme.colors.gray[600];
  const removeItemColor = theme.colors.pink[600];

 
  useEffect(() => {
    console.log("Playlist updated:", playlist);
  }, [playlist]);
  

  return (
    <List>
      {playlist && playlist.length === 0 ? (<Text>Playlist is Empty. Add Exercises to your playlist.</Text>) : null}
      {playlist?.map((data: File, index: number) => (
        <ListItem
          key={data.uniqueId}
          style={
            index === currentPlayingIndex
              ? {
                  border: `1px solid ${selectedItemColor}`,
                  borderRadius: "2px",
                  padding: "4px",
                }
              : {}
          }
          onClick={() => setCurrentTrackIndex(index)}
          _hover={{ backgroundColor: LstItemHover }}
        >
          <Flex justifyContent="space-between" width="100%">
            {/* Left side content */}
            <VStack align="start" spacing={1}>
              <Heading as="h3" size="lg">
                {data.ExerciseName}
              </Heading>
              <Heading as="h5" size="sm">
                {data.methodName}
              </Heading>
              <Flex>
                <Badge colorScheme="green" marginRight={1}>
                  RANGE:
                </Badge>
                {data.range}
                <Badge colorScheme="green" marginLeft={3} marginRight={1}>
                  DIRECTION:
                </Badge>
                {data.direction}
                <Badge colorScheme="green" marginLeft={3} marginRight={1}>
                  TEMPO:
                </Badge>
                {data.tempo}
              </Flex>
            </VStack>

            {/* Right side (buttons) */}
            <VStack align="end" spacing={1}>
              <Flex width="100%">
                <Button size="sm" flex="1" onClick={() => moveItemUp(index)}>
                  Up
                </Button>
                <Button size="sm" flex="1" onClick={() => moveItemDown(index)}>
                  Down
                </Button>
              </Flex>
              <Button
                bg={removeItemColor}
                size="md"
                width="100%"
                onClick={() => removeFromPlaylist(data.uniqueId)}
              >
                Remove
              </Button>
            </VStack>
          </Flex>
        </ListItem>
      ))}
    </List>
  );
};

export default Playlist;
