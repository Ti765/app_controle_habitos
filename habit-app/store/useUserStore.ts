import { create } from 'zustand';
import { User } from '../lib/types/user';
import { userStorage } from '../lib/storage/user-storage';

interface UserState {
  user: User | null;
  loading: boolean;
  loadUser: () => Promise<void>;
  updateUser: (user: User) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  loading: false,

  loadUser: async () => {
    set({ loading: true });
    const user = await userStorage.getUser();
    set({ user, loading: false });
  },

  updateUser: async (user: User) => {
    await userStorage.saveUser(user);
    set({ user });
  },
}));
