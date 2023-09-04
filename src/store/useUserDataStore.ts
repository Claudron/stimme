import { create } from "zustand";
import User from "../entities/user";

interface UserDataStore {
     user: User;
     setEmail: (email: string) => void;
     setFirstName: (first_name: string) => void;
     setLastName: (last_name: string) => void;
}



const useUserDataStore = create<UserDataStore>(set => ({
    user: {
        email: "",
        first_name: "",
        last_name: "",
    },

    setEmail: (email) => set((state) => ({ ...state, user:{ ...state.user, email}})),
    setFirstName: (first_name) => set((state) => ({ ...state, user: { ...state.user, first_name } })),
    setLastName: (last_name) => set((state) => ({ ...state, user: { ...state.user, last_name } })),
}));

export default useUserDataStore;