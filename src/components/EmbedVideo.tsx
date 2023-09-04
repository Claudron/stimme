import { Box, GridItem } from "@chakra-ui/react";

interface Props {
  embedUrl: string | undefined;
}

const EmbedVideo = ({ embedUrl }: Props) => {
  const getEmbedContent = (url: string) => {
    if (url) {
      const parsedUrl = new URL(url);
      const hostname = parsedUrl.hostname;

      if (hostname.includes("youtube.com")) {
        const youtubeId = parsedUrl.searchParams.get("v");
        return {
          type: "youtube",
          embedUrl: `https://www.youtube.com/embed/${youtubeId}`,
        };
      } else if (hostname.includes("vimeo.com")) {
        const vimeoId = parsedUrl.pathname.split("/").pop();
        return {
          type: "vimeo",
          embedUrl: `https://player.vimeo.com/video/${vimeoId}`,
        };
      }
    }
    return null;
  };

  const embedContent = embedUrl ? getEmbedContent(embedUrl) : null;

  return (
    <GridItem>
      {embedContent && (
        <Box display="flex" justifyContent="center" alignItems="center">
          <iframe
            src={embedContent.embedUrl}
            width="800" 
            height="450" 
            allow="fullscreen"
            allowFullScreen
            title={`${embedContent.type} Video`}
          ></iframe>
        </Box>
      )}
    </GridItem>
  );
};

export default EmbedVideo;
