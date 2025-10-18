import AsyncStorage from '@react-native-async-storage/async-storage';
import { Habit } from '../types/habit';

const HABITS_KEY = '@habits';

export const habitsStorage = {
  async getHabits(): Promise<Habit[]> {
    try {
      const data = await AsyncStorage.getItem(HABITS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading habits:', error);
      return [];
    }
  },

  async saveHabits(habits: Habit[]): Promise<void> {
    try {
      await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(habits));
    } catch (error) {
      console.error('Error saving habits:', error);
    }
  },

  async toggleHabit(habitId: string, date: string): Promise<void> {
    try {
      const habits = await this.getHabits();
      const habit = habits.find((h) => h.id === habitId);
      if (!habit) return;

      const dateIndex = habit.completedDates.indexOf(date);
      if (dateIndex > -1) {
        habit.completedDates.splice(dateIndex, 1);
      } else {
        habit.completedDates.push(date);
      }

      habit.streak = this.calculateStreak(habit.completedDates);
      await this.saveHabits(habits);
    } catch (error) {
      console.error('Error toggling habit:', error);
    }
  },

  calculateStreak(completedDates: string[]): number {
    if (completedDates.length === 0) return 0;

    const sorted = completedDates.sort().reverse();
    const today = new Date().toISOString().split('T')[0];
    let streak = 0;

    for (let i = 0; i < sorted.length; i++) {
      const expectedDate = new Date();
      expectedDate.setDate(expectedDate.getDate() - i);
      const expected = expectedDate.toISOString().split('T')[0];

      if (sorted[i] === expected || (i === 0 && sorted[0] < today)) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  },
};
