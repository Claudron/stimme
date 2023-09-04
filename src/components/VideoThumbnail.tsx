import { Center, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface Props {
  embedUrl: string;
}

const VideoThumbnail = ({ embedUrl }: Props) => {
  
  const getId = (url: string) => {
    const match = url.match(/vimeo\.com\/(\d+)/);
  return match ? match[1] : null;  
  } 
 
  const videoId = getId(embedUrl);

  const [thumbnailUrl, setThumbnailUrl] = useState(null);

  useEffect(() => {
    fetch(`https://vimeo.com/api/oembed.json?url=https://vimeo.com/${videoId}`)
      .then((response) => response.json())
      .then((data) => {
        setThumbnailUrl(data.thumbnail_url);
      });
  }, [videoId]);

  return (
    <div>
      {thumbnailUrl ? (
        <img src={thumbnailUrl} alt="Video Thumbnail" />
      ) : (
        <Center>
          <Spinner/>
        </Center>
      )}
    </div>
  );
};

export default VideoThumbnail;
