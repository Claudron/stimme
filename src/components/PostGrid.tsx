import {
  SimpleGrid,
  Spinner,
  Text
} from "@chakra-ui/react";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import usePosts from "../hooks/usePosts";
import PostCard from "./PostCard";
import PostCardContainer from "./PostCardContainer";

const PostGrid = () => {
  const { data, error, fetchNextPage, hasNextPage } =
    usePosts();
  const fetchedGamesCount =
    data?.pages.reduce((total, page) => total + page.results.length, 0) || 0;
  return (
   
        <InfiniteScroll
          dataLength={fetchedGamesCount}
          hasMore={!!hasNextPage}
          next={() => fetchNextPage()}
          loader={<Spinner />}
        >
          {error && <Text>{error.message}</Text>}
          <SimpleGrid
            columns={{ sm: 2, md: 3, lg: 4, xl: 5 }}
            padding="10px"
            spacing={6}
          >
            {data?.pages.map((page, index) => (
              <React.Fragment key={index}>
                {page.results.map((post) => (
                  <PostCardContainer key={post.id}>
                    <PostCard post={post} />
                  </PostCardContainer>
                ))}
              </React.Fragment>
            ))}
          </SimpleGrid>
        </InfiniteScroll>
  
  );
};

export default PostGrid;
