export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  level: number;
  totalDays: number;
  currentStreak: number;
  longestStreak: number;
  badges: Badge[];
  preferences: UserPreferences;
  createdAt: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface UserPreferences {
  notifications: boolean;
  appleHealth: boolean;
  theme: 'light' | 'dark' | 'auto';
}
