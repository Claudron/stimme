import { create } from 'zustand';


interface PostQuery {
    categoryId?: number | null;
    sortOrder?: string;
    searchText?: string | undefined;
  }


interface PostQueryStore {
    PostQuery: PostQuery;
    setSearchText:(searchText: string | undefined) => void;
    setCategoryId: (genreId: number | null) => void;
    setSortOrder: (sortOrder: string) => void;
}

const usePostQueryStore = create<PostQueryStore>(set => ({
    PostQuery: {
        categoryId: null, 
        sortOrder: undefined,
        searchText: undefined
    },
    setSearchText: (searchText) => set(() => ({ PostQuery: { searchText} })),
    setCategoryId: (genreId) => set(store => ({ PostQuery: {...store.PostQuery, categoryId: genreId} })),
    setSortOrder: (sortOrder) => set(store => ({ PostQuery: { ...store.PostQuery, sortOrder} })),
}))

export default usePostQueryStore;
