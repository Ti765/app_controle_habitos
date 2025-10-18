import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/user';

const USER_KEY = '@user';
const THEME_KEY = '@theme';

export const userStorage = {
  async getUser(): Promise<User | null> {
    try {
      const data = await AsyncStorage.getItem(USER_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error loading user:', error);
      return null;
    }
  },

  async saveUser(user: User): Promise<void> {
    try {
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user:', error);
    }
  },

  async getTheme(): Promise<'light' | 'dark' | 'auto'> {
    try {
      const theme = await AsyncStorage.getItem(THEME_KEY);
      return (theme as 'light' | 'dark' | 'auto') || 'dark';
    } catch (error) {
      console.error('Error loading theme:', error);
      return 'dark';
    }
  },

  async saveTheme(theme: 'light' | 'dark' | 'auto'): Promise<void> {
    try {
      await AsyncStorage.setItem(THEME_KEY, theme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  },
};
