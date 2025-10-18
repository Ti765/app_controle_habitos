import AsyncStorage from '@react-native-async-storage/async-storage';
import { CheckIn } from '../types/energy';

const CHECKINS_KEY = '@checkins';

export const energyStorage = {
  async getCheckIns(): Promise<CheckIn[]> {
    try {
      const data = await AsyncStorage.getItem(CHECKINS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading check-ins:', error);
      return [];
    }
  },

  async saveCheckIn(checkIn: CheckIn): Promise<void> {
    try {
      const checkIns = await this.getCheckIns();
      checkIns.push(checkIn);
      await AsyncStorage.setItem(CHECKINS_KEY, JSON.stringify(checkIns));
    } catch (error) {
      console.error('Error saving check-in:', error);
    }
  },
};
