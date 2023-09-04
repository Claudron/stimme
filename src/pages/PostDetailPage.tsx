import { useParams } from "react-router-dom";
import usePostDetail from "../hooks/usePostDetail";
import {
  GridItem,
  Heading,
  SimpleGrid,
  Text,
  Image,
  Box,
  HStack,
  Container,
} from "@chakra-ui/react";
import noImage from "../assets/no-image-placeholder-6f3882e0.webp";
import EmbedVideo from "../components/EmbedVideo";

const PostDetailPage = () => {
  const { id } = useParams();
  const { data: post, error } = usePostDetail(id!);

  if (error || !id) throw error;

  return (
    <Container maxW="860">
      <Box marginBottom={5}>
        <EmbedVideo embedUrl={post?.embed_video_url} />
      </Box>
      <Heading>{post?.title}</Heading>
      <SimpleGrid columns={1}>
        <Text fontSize="sm" color="gray.600">
          {post?.date_created &&
            new Date(post.date_created)
              .toISOString()
              .split("T")[0]
              .replace(/-/g, ".")}
        </Text>
        <HStack>
          <GridItem>
            <Text fontSize={25}>{post?.body}</Text>
          </GridItem>
        </HStack>
       
        <SimpleGrid marginTop={5} columns={{ base: 1, md: 2 }} spacing={2}>
          {post?.content_image && post.content_image.length > 0 ? (
            post.content_image.map((file, index) => {
              return <Image key={index} src={file.image} alt="Content Image" />;
            })
          ) : (
            <Image src={noImage} alt="No Content Image" />
          )}
        </SimpleGrid>
      </SimpleGrid>
    </Container>
  );
};

export default PostDetailPage;
