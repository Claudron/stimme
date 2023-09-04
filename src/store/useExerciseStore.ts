import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid'; 

export interface File {
    id: number;
    uniqueId: string;
    file: string;
    ExerciseName: string;
    methodName: string;
    range: string;
    direction: string;
    tempo: string;
}

interface Playlist {
  playlist: File[];
  currentTrackIndex: number; 
  addToPlaylist: (file: File) => void;
  loadPlaylist: (files: File[]) => void;
  clearPlaylist: () => void;
  removeFromPlaylist: (uniqueId: string) => void;
  setCurrentTrackIndex: (index: number) => void;
  incrementTrackIndex: () => void;
  decrementTrackIndex: () => void;
  moveItemUp: (index: number) => void;
  moveItemDown: (index: number) => void;
}

export const usePlaylistStore = create<Playlist>((set) => ({
  playlist: [],
  currentTrackIndex: 0,
  addToPlaylist: (file) => {
    const newFile = { ...file, uniqueId: uuidv4() };
    set((state) => ({
      playlist: [...state.playlist, newFile],
      currentTrackIndex: state.playlist.length === 0 ? 0 : state.currentTrackIndex,
    }));
  },
  loadPlaylist: (files) => {
    set({ playlist: files, currentTrackIndex: 0 });
  },
  clearPlaylist: () => {
    set({playlist:[]});
    console.log("Playlist after clearing:", usePlaylistStore.getState().playlist);
  },
  removeFromPlaylist: (uniqueId) => {
    set((state) => {
      const newPlaylist = state.playlist.filter(file => file.uniqueId !== uniqueId);
      let newIndex = state.currentTrackIndex;
      
      if (state.playlist[state.currentTrackIndex].uniqueId === uniqueId) {
        newIndex = Math.max(0, state.currentTrackIndex - 1);
      }
      
      return {
        playlist: newPlaylist,
        currentTrackIndex: newIndex,
      };
    });
  },
  setCurrentTrackIndex: (index) => {
    set({ currentTrackIndex: index });
  },
  incrementTrackIndex: () => {
    set((state) => ({ 
      currentTrackIndex: Math.min(state.playlist.length - 1, state.currentTrackIndex + 1) 
    }));
  },
  decrementTrackIndex: () => {
    set((state) => ({ 
      currentTrackIndex: Math.max(0, state.currentTrackIndex - 1) 
    }));
  },
  moveItemUp: (index) => set((state) => {
    if (index <= 0) return state;
    const playlistCopy = [...state.playlist];
    const temp = playlistCopy[index - 1];
    playlistCopy[index - 1] = playlistCopy[index];
    playlistCopy[index] = temp;
    return { playlist: playlistCopy };
  }),

  moveItemDown: (index) => set((state) => {
    if (index >= state.playlist.length - 1) return state;
    const playlistCopy = [...state.playlist];
    const temp = playlistCopy[index + 1];
    playlistCopy[index + 1] = playlistCopy[index];
    playlistCopy[index] = temp;
    return { playlist: playlistCopy };
  }),

}));

export default usePlaylistStore;
