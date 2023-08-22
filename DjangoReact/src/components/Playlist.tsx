import usePlaylistStore from "../store/useExerciseStore";
import { Badge, Button, Heading, List, ListItem } from "@chakra-ui/react";
import { File } from "../store/useExerciseStore";
import React from "react";


const Playlist = () => {
    const playlist = usePlaylistStore(s => s.playlist);
    const removeFromPlaylist = usePlaylistStore(s => s.removeFromPlaylist);
    
    console.log(playlist);
    
  return (
    <List>
       
       {playlist?.map((data: File) => (
  <React.Fragment key={data.uniqueId}>
    <ListItem>
      <Heading as='h3' size='lg'>{data.ExerciseName}</Heading>
      <Heading as='h5' size='sm'>
      {data.methodName}
        </Heading> 
        <Badge colorScheme='green' marginRight={1}>RANGE:</Badge>{data.range}  
        <Badge colorScheme='green' marginLeft={3} marginRight={1}> DIRECTION:</Badge>{data.direction}  
        <Badge colorScheme='green' marginLeft={3} marginRight={1}>TEMPO:</Badge>{data.tempo}  
         
      <Button marginLeft={3}  onClick={() => removeFromPlaylist(data.uniqueId)}>Remove</Button>
    </ListItem>
  </React.Fragment>
))}

    </List>
  );
};

export default Playlist;
