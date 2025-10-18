import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStore } from '../../store/useThemeStore';
import { useHabitsStore } from '../../store/useHabitsStore';
import { Header } from '../../components/shared/Header';
import { HabitItem } from '../../components/habits/HabitItem';
import { Card } from '../../components/ui/Card';
import { getTodayString } from '../../utils/date-helpers';
import { Spacing, Typography, FontWeight, Radius } from '../../constants/Tokens';

export default function HabitsScreen() {
  const router = useRouter();
  const { activeColors } = useThemeStore();
  const { habits, toggleHabit } = useHabitsStore();
  
  const today = getTodayString();
  const completedToday = habits.filter((h) => h.completedDates.includes(today)).length;
  const totalHabits = habits.length;

  const morningHabits = habits.filter((h) => h.timeOfDay === 'morning');
  const afternoonHabits = habits.filter((h) => h.timeOfDay === 'afternoon');
  const nightHabits = habits.filter((h) => h.timeOfDay === 'night');

  return (
    <View style={{ flex: 1, backgroundColor: activeColors.bg }}>
      <Header
        title="Hábitos"
        subtitle={`${completedToday} de ${totalHabits} completos`}
        rightAction={{
          icon: 'add-circle-outline',
          onPress: () => router.push('/modals/add-habit'),
        }}
      />
      
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: Spacing.lg, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <Card elevation={1} padding="md" style={{ marginBottom: Spacing.lg }}>
          <Text style={{ fontSize: Typography.sm, color: activeColors.textDim, marginBottom: 4 }}>
            Progresso Hoje
          </Text>
          <Text style={{ fontSize: Typography.xxl, fontWeight: FontWeight.bold, color: activeColors.text }}>
            {Math.round((completedToday / totalHabits) * 100)}%
          </Text>
        </Card>

        {morningHabits.length > 0 && (
          <View style={{ marginBottom: Spacing.xl }}>
            <Text style={{ fontSize: Typography.md, fontWeight: FontWeight.semibold, color: activeColors.text, marginBottom: Spacing.md }}>
              🌅 Manhã
            </Text>
            {morningHabits.map((habit) => (
              <HabitItem
                key={habit.id}
                emoji={habit.emoji}
                title={habit.title}
                streak={habit.streak}
                completed={habit.completedDates.includes(today)}
                onToggle={() => toggleHabit(habit.id, today)}
              />
            ))}
          </View>
        )}

        {afternoonHabits.length > 0 && (
          <View style={{ marginBottom: Spacing.xl }}>
            <Text style={{ fontSize: Typography.md, fontWeight: FontWeight.semibold, color: activeColors.text, marginBottom: Spacing.md }}>
              ☀️ Tarde
            </Text>
            {afternoonHabits.map((habit) => (
              <HabitItem
                key={habit.id}
                emoji={habit.emoji}
                title={habit.title}
                streak={habit.streak}
                completed={habit.completedDates.includes(today)}
                onToggle={() => toggleHabit(habit.id, today)}
              />
            ))}
          </View>
        )}

        {nightHabits.length > 0 && (
          <View style={{ marginBottom: Spacing.xl }}>
            <Text style={{ fontSize: Typography.md, fontWeight: FontWeight.semibold, color: activeColors.text, marginBottom: Spacing.md }}>
              🌙 Noite
            </Text>
            {nightHabits.map((habit) => (
              <HabitItem
                key={habit.id}
                emoji={habit.emoji}
                title={habit.title}
                streak={habit.streak}
                completed={habit.completedDates.includes(today)}
                onToggle={() => toggleHabit(habit.id, today)}
              />
            ))}
          </View>
        )}
      </ScrollView>

      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: activeColors.accent,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}
        onPress={() => router.push('/modals/add-habit')}
      >
        <Ionicons name="add" size={32} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
}
