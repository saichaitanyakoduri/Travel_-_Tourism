// userStore.ts
import create from 'zustand';

interface User {
  fullName: string;
  email: string;
  profilePicture?: string;  // optional field for profile picture
}

interface UserStore {
  user: User | null;  // user can be either a User or null
  setUser: (user: User | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,  // default state is null
  setUser: (user) => set({ user }),  // setUser accepts a User or null
}));
