import { useInfiniteQuery } from "@tanstack/react-query";
import { Post } from "../entities/post";
import apiClient from "../services/api-client";
import usePostQueryStore from "../store/PostStore";

// Using the provided FetchResponse interface
interface FetchResponse<T>{
  count: number;
  next: string | null;
  results: T[];
}

const usePosts = () => {
  const postQuery = usePostQueryStore(s => s.PostQuery);

  const queryInfo = useInfiniteQuery<FetchResponse<Post>, Error>({
    queryKey: ['posts', postQuery],
    queryFn: ({ pageParam = 1 }) => 
      apiClient
        .get<FetchResponse<Post>>('/content/list/', {
          params: {
            categories: postQuery.categoryId,
            ordering: postQuery.sortOrder,
            search: postQuery.searchText,
            page: pageParam
          }
        })
        .then(res => {
          console.log("Fetched Data:", res.data);  // Logging the fetched data
          return res.data;
        }),
    getNextPageParam: (lastPage) => {
      const nextPageUrl = lastPage.next;
      if (nextPageUrl) {
        const url = new URL(nextPageUrl);
        return parseInt(url.searchParams.get("page") || '');
      }
      return undefined;
    }
  });

  return queryInfo;
}

export default usePosts;
