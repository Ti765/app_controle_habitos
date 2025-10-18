import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStore } from '../../store/useThemeStore';
import { useHabitsStore } from '../../store/useHabitsStore';
import { EnergyRing } from '../../components/home/EnergyRing';
import { PillarCard } from '../../components/home/PillarCard';
import { Button } from '../../components/ui/Button';
import { HabitItem } from '../../components/habits/HabitItem';
import { calculateEnergyScore } from '../../lib/calculations/energy-score';
import { getTodayString, getTimeOfDayGreeting, formatDateLong } from '../../utils/date-helpers';
import { Config } from '../../constants/Config';
import { Spacing, Typography, FontWeight } from '../../constants/Tokens';

export default function HomeScreen() {
  const router = useRouter();
  const { activeColors } = useThemeStore();
  const { habits, toggleHabit } = useHabitsStore();
  
  const today = getTodayString();
  const energyScore = calculateEnergyScore(habits, today);
  const todayHabits = habits.filter((h) => h.timeOfDay === 'morning').slice(0, 3);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: activeColors.bg }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ paddingHorizontal: Spacing.lg, paddingTop: Spacing.xxxl }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.xl }}>
          <View>
            <Text style={{ fontSize: Typography.xxl, fontWeight: FontWeight.bold, color: activeColors.text }}>
              {getTimeOfDayGreeting()}
            </Text>
            <Text style={{ fontSize: Typography.sm, color: activeColors.textDim, marginTop: 4 }}>
              {formatDateLong(new Date())}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', gap: Spacing.md }}>
            <TouchableOpacity onPress={() => router.push('/modals/check-in')}>
              <Ionicons name="flash" size={24} color={activeColors.accent} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="notifications-outline" size={24} color={activeColors.text} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ alignItems: 'center', marginVertical: Spacing.xl }}>
          <EnergyRing value={energyScore.total} />
        </View>

        <Text style={{ fontSize: Typography.lg, fontWeight: FontWeight.bold, color: activeColors.text, marginBottom: Spacing.md }}>
          Seus Pilares
        </Text>
        
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md, marginBottom: Spacing.xl }}>
          {Config.pillars.map((pillar) => (
            <PillarCard
              key={pillar.id}
              emoji={pillar.emoji}
              title={pillar.title}
              value={energyScore[pillar.id as keyof typeof energyScore] as number}
              color={pillar.color}
            />
          ))}
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.md }}>
          <Text style={{ fontSize: Typography.lg, fontWeight: FontWeight.bold, color: activeColors.text }}>
            Hábitos Hoje
          </Text>
          <TouchableOpacity onPress={() => router.push('/habits')}>
            <Text style={{ fontSize: Typography.sm, color: activeColors.accent, fontWeight: FontWeight.semibold }}>
              Ver Todos
            </Text>
          </TouchableOpacity>
        </View>

        {todayHabits.map((habit) => (
          <HabitItem
            key={habit.id}
            emoji={habit.emoji}
            title={habit.title}
            streak={habit.streak}
            completed={habit.completedDates.includes(today)}
            onToggle={() => toggleHabit(habit.id, today)}
          />
        ))}

        <View style={{ marginVertical: Spacing.xl }}>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onPress={() => {}}
          >
            🚀 Turbine sua Performance
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
