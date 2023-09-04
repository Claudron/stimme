import { Post } from "../entities/post";
import { Card, CardBody, Heading, Image, Text } from "@chakra-ui/react";
import noImage from "../assets/no-image-placeholder-6f3882e0.webp";
import { Link } from "react-router-dom";
import VideoThumbnail from "./VideoThumbnail";

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  return (
    <Card borderEndRadius={10} overflow={"hidden"}>
      {post.embed_video_url ? (
    <VideoThumbnail embedUrl={post.embed_video_url} />
  ) : (
    <Image src={noImage} />
  )}
      <CardBody>
        <Heading fontSize="2xl">
          <Link to={"/posts/" + post.id}>{post.title}</Link>
        </Heading>
      </CardBody>
        <Text padding={3} align="right" fontSize="sm" color="gray.600">
        {post?.date_created && new Date(post.date_created).toISOString().split('T')[0].replace(/-/g, '.')}
        </Text>
    </Card>
  );
};

export default PostCard;
