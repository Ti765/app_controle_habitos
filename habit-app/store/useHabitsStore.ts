import { create } from 'zustand';
import { Habit } from '../lib/types/habit';
import { habitsStorage } from '../lib/storage/habits-storage';

interface HabitsState {
  habits: Habit[];
  loading: boolean;
  loadHabits: () => Promise<void>;
  addHabit: (habit: Habit) => Promise<void>;
  toggleHabit: (habitId: string, date: string) => Promise<void>;
  deleteHabit: (habitId: string) => Promise<void>;
}

export const useHabitsStore = create<HabitsState>((set, get) => ({
  habits: [],
  loading: false,

  loadHabits: async () => {
    set({ loading: true });
    const habits = await habitsStorage.getHabits();
    set({ habits, loading: false });
  },

  addHabit: async (habit: Habit) => {
    const { habits } = get();
    const updated = [...habits, habit];
    await habitsStorage.saveHabits(updated);
    set({ habits: updated });
  },

  toggleHabit: async (habitId: string, date: string) => {
    await habitsStorage.toggleHabit(habitId, date);
    const habits = await habitsStorage.getHabits();
    set({ habits });
  },

  deleteHabit: async (habitId: string) => {
    const { habits } = get();
    const updated = habits.filter((h) => h.id !== habitId);
    await habitsStorage.saveHabits(updated);
    set({ habits: updated });
  },
}));
