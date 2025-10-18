import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { useThemeStore } from '../store/useThemeStore';
import { useHabitsStore } from '../store/useHabitsStore';
import { useEnergyStore } from '../store/useEnergyStore';
import { useUserStore } from '../store/useUserStore';
import { habitsStorage } from '../lib/storage/habits-storage';
import { userStorage } from '../lib/storage/user-storage';
import { mockHabits, mockUser } from '../lib/storage/mock-data';

export default function RootLayout() {
  const systemColorScheme = useColorScheme();
  const { loadTheme, updateActiveColors } = useThemeStore();
  const { loadHabits } = useHabitsStore();
  const { loadCheckIns } = useEnergyStore();
  const { loadUser, updateUser } = useUserStore();

  useEffect(() => {
    async function initialize() {
      await loadTheme();
      
      const existingHabits = await habitsStorage.getHabits();
      if (existingHabits.length === 0) {
        await habitsStorage.saveHabits(mockHabits);
      }
      
      const existingUser = await userStorage.getUser();
      if (!existingUser) {
        await updateUser(mockUser);
      }
      
      await loadHabits();
      await loadCheckIns();
      await loadUser();
    }

    initialize();
  }, []);

  useEffect(() => {
    updateActiveColors(systemColorScheme || 'dark');
  }, [systemColorScheme]);

  const { activeColors } = useThemeStore();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: activeColors.bg },
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="modals/check-in"
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen
        name="modals/add-habit"
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
    </Stack>
  );
}
