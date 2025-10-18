import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useThemeStore } from '../../store/useThemeStore';
import { useHabitsStore } from '../../store/useHabitsStore';
import { Header } from '../../components/shared/Header';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { calculateEnergyScore } from '../../lib/calculations/energy-score';
import { analyzePatterns } from '../../lib/calculations/insights-engine';
import { getDaysAgo, getTodayString } from '../../utils/date-helpers';
import { Spacing, Typography, FontWeight } from '../../constants/Tokens';
import { Ionicons } from '@expo/vector-icons';

export default function InsightsScreen() {
  const { activeColors } = useThemeStore();
  const { habits } = useHabitsStore();
  const [filter, setFilter] = useState<'week' | 'month' | '3months'>('week');

  const days = filter === 'week' ? 7 : filter === 'month' ? 30 : 90;
  const scores = Array.from({ length: days }, (_, i) => {
    const date = getDaysAgo(days - 1 - i);
    return calculateEnergyScore(habits, date);
  });

  const patterns = analyzePatterns(scores);
  const avgEnergy = Math.round(
    scores.reduce((sum, s) => sum + s.total, 0) / scores.length
  );

  return (
    <View style={{ flex: 1, backgroundColor: activeColors.bg }}>
      <Header title="Insights" subtitle="Análise de Performance" />
      
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xxxl }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.xl }}>
          {(['week', 'month', '3months'] as const).map((f) => (
            <Button
              key={f}
              variant={filter === f ? 'primary' : 'secondary'}
              size="sm"
              onPress={() => setFilter(f)}
            >
              {f === 'week' ? 'Semana' : f === 'month' ? 'Mês' : '3 Meses'}
            </Button>
          ))}
        </View>

        <View style={{ flexDirection: 'row', gap: Spacing.md, marginBottom: Spacing.xl }}>
          <Card elevation={1} padding="md" style={{ flex: 1 }}>
            <Text style={{ fontSize: Typography.sm, color: activeColors.textDim }}>
              Energia Média
            </Text>
            <Text style={{ fontSize: Typography.xxl, fontWeight: FontWeight.bold, color: activeColors.text, marginTop: 4 }}>
              {avgEnergy}%
            </Text>
          </Card>
          <Card elevation={1} padding="md" style={{ flex: 1 }}>
            <Text style={{ fontSize: Typography.sm, color: activeColors.textDim }}>
              Melhor Dia
            </Text>
            <Text style={{ fontSize: Typography.xxl, fontWeight: FontWeight.bold, color: activeColors.text, marginTop: 4 }}>
              {Math.max(...scores.map((s) => s.total))}%
            </Text>
          </Card>
        </View>

        <Text style={{ fontSize: Typography.lg, fontWeight: FontWeight.bold, color: activeColors.text, marginBottom: Spacing.md }}>
          Padrões Identificados
        </Text>

        {patterns.map((pattern, index) => (
          <Card key={index} elevation={1} padding="md" style={{ marginBottom: Spacing.md }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.sm }}>
              <Ionicons
                name={
                  pattern.trend === 'up'
                    ? 'trending-up'
                    : pattern.trend === 'down'
                    ? 'trending-down'
                    : 'remove'
                }
                size={20}
                color={
                  pattern.trend === 'up'
                    ? activeColors.success
                    : pattern.trend === 'down'
                    ? activeColors.warning
                    : activeColors.textDim
                }
                style={{ marginRight: Spacing.sm }}
              />
              <Text style={{ fontSize: Typography.base, fontWeight: FontWeight.semibold, color: activeColors.text, flex: 1 }}>
                {pattern.title}
              </Text>
            </View>
            <Text style={{ fontSize: Typography.sm, color: activeColors.textDim }}>
              {pattern.description}
            </Text>
          </Card>
        ))}

        <View style={{ marginTop: Spacing.xl }}>
          <Button variant="primary" size="lg" fullWidth>
            📊 Ver Relatório Completo
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}
