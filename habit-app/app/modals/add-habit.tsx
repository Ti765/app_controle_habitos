import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useThemeStore } from '../../store/useThemeStore';
import { useHabitsStore } from '../../store/useHabitsStore';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Habit, TimeOfDay } from '../../lib/types/habit';
import { Spacing, Typography, FontWeight, Radius } from '../../constants/Tokens';
import { Ionicons } from '@expo/vector-icons';

const EMOJIS = ['😴', '🍳', '💧', '🏃', '🧘', '🥗', '☕', '📚', '🎯', '💪'];
const PILLARS = [
  { id: 'sleep', label: 'Sono', emoji: '😴' },
  { id: 'nutrition', label: 'Nutrição', emoji: '🥗' },
  { id: 'hydration', label: 'Hidratação', emoji: '💧' },
  { id: 'movement', label: 'Movimento', emoji: '🏃' },
] as const;
const TIMES = [
  { id: 'morning', label: 'Manhã', emoji: '🌅' },
  { id: 'afternoon', label: 'Tarde', emoji: '☀️' },
  { id: 'night', label: 'Noite', emoji: '🌙' },
] as const;

export default function AddHabitModal() {
  const router = useRouter();
  const { activeColors } = useThemeStore();
  const { addHabit } = useHabitsStore();
  const [title, setTitle] = useState('');
  const [emoji, setEmoji] = useState('🎯');
  const [pillar, setPillar] = useState<'sleep' | 'nutrition' | 'hydration' | 'movement'>('sleep');
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('morning');

  const handleSave = async () => {
    if (!title.trim()) return;

    const newHabit: Habit = {
      id: Date.now().toString(),
      title: title.trim(),
      emoji,
      timeOfDay,
      pillar,
      streak: 0,
      completedDates: [],
      createdAt: new Date().toISOString(),
    };

    await addHabit(newHabit);
    router.back();
  };

  return (
    <View style={{ flex: 1, backgroundColor: activeColors.overlay }}>
      <TouchableOpacity
        style={{ flex: 1 }}
        activeOpacity={1}
        onPress={() => router.back()}
      />
      
      <View
        style={{
          backgroundColor: activeColors.bgElevated,
          borderTopLeftRadius: Radius.lg,
          borderTopRightRadius: Radius.lg,
          padding: Spacing.xl,
          maxHeight: '80%',
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.xl }}>
          <Text style={{ fontSize: Typography.xl, fontWeight: FontWeight.bold, color: activeColors.text }}>
            Novo Hábito
          </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={28} color={activeColors.textDim} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Input
            label="Nome do Hábito"
            value={title}
            onChangeText={setTitle}
            placeholder="Ex: Meditar 10 minutos"
          />

          <View style={{ marginTop: Spacing.lg }}>
            <Text style={{ fontSize: Typography.sm, fontWeight: FontWeight.medium, color: activeColors.text, marginBottom: Spacing.sm }}>
              Emoji
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm }}>
              {EMOJIS.map((e) => (
                <TouchableOpacity
                  key={e}
                  onPress={() => setEmoji(e)}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: emoji === e ? activeColors.accentSubtle : activeColors.bgBlur,
                    borderWidth: 2,
                    borderColor: emoji === e ? activeColors.accent : activeColors.border,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ fontSize: 24 }}>{e}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={{ marginTop: Spacing.lg }}>
            <Text style={{ fontSize: Typography.sm, fontWeight: FontWeight.medium, color: activeColors.text, marginBottom: Spacing.sm }}>
              Pilar
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm }}>
              {PILLARS.map((p) => (
                <TouchableOpacity
                  key={p.id}
                  onPress={() => setPillar(p.id)}
                  style={{
                    paddingHorizontal: Spacing.lg,
                    paddingVertical: Spacing.md,
                    borderRadius: Radius.md,
                    backgroundColor: pillar === p.id ? activeColors.accentSubtle : activeColors.bgBlur,
                    borderWidth: 1,
                    borderColor: pillar === p.id ? activeColors.accent : activeColors.border,
                  }}
                >
                  <Text style={{ fontSize: Typography.sm, color: pillar === p.id ? activeColors.accent : activeColors.text }}>
                    {p.emoji} {p.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={{ marginTop: Spacing.lg, marginBottom: Spacing.xl }}>
            <Text style={{ fontSize: Typography.sm, fontWeight: FontWeight.medium, color: activeColors.text, marginBottom: Spacing.sm }}>
              Período
            </Text>
            <View style={{ flexDirection: 'row', gap: Spacing.sm }}>
              {TIMES.map((t) => (
                <TouchableOpacity
                  key={t.id}
                  onPress={() => setTimeOfDay(t.id)}
                  style={{
                    flex: 1,
                    paddingVertical: Spacing.md,
                    borderRadius: Radius.md,
                    backgroundColor: timeOfDay === t.id ? activeColors.accentSubtle : activeColors.bgBlur,
                    borderWidth: 1,
                    borderColor: timeOfDay === t.id ? activeColors.accent : activeColors.border,
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ fontSize: Typography.sm, color: timeOfDay === t.id ? activeColors.accent : activeColors.text }}>
                    {t.emoji} {t.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={{ flexDirection: 'row', gap: Spacing.md, marginBottom: Spacing.lg }}>
            <Button variant="ghost" onPress={() => router.back()} fullWidth>
              Cancelar
            </Button>
            <Button variant="primary" onPress={handleSave} disabled={!title.trim()} fullWidth>
              Criar
            </Button>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
