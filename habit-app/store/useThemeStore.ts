import { create } from 'zustand';
import { useColorScheme } from 'react-native';
import { ColorsDark, ColorsLight, ColorScheme } from '../constants/Colors';
import { userStorage } from '../lib/storage/user-storage';

interface ThemeState {
  theme: 'light' | 'dark' | 'auto';
  activeColors: ColorScheme;
  setTheme: (theme: 'light' | 'dark' | 'auto') => Promise<void>;
  loadTheme: () => Promise<void>;
  updateActiveColors: (systemTheme: 'light' | 'dark') => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: 'dark',
  activeColors: ColorsDark,

  setTheme: async (theme: 'light' | 'dark' | 'auto') => {
    await userStorage.saveTheme(theme);
    set({ theme });
  },

  loadTheme: async () => {
    const theme = await userStorage.getTheme();
    set({ theme });
  },

  updateActiveColors: (systemTheme: 'light' | 'dark') => {
    const { theme } = get();
    const activeTheme = theme === 'auto' ? systemTheme : theme;
    const activeColors = activeTheme === 'dark' ? ColorsDark : ColorsLight;
    set({ activeColors });
  },
}));
