import { create } from "zustand";

interface AuthStore {
  authStatus: boolean;
  setIsAuthenticated: (authStatus: boolean) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  authStatus: false,
  setIsAuthenticated: (authStatus) => set(() => ({ authStatus })),
}));

export default useAuthStore;
