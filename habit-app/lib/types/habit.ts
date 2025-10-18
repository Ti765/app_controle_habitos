export type TimeOfDay = 'morning' | 'afternoon' | 'night';

export interface Habit {
  id: string;
  title: string;
  emoji: string;
  timeOfDay: TimeOfDay;
  pillar: 'sleep' | 'nutrition' | 'hydration' | 'movement';
  streak: number;
  completedDates: string[];
  createdAt: string;
}

export interface HabitCompletion {
  habitId: string;
  date: string;
  completed: boolean;
}
