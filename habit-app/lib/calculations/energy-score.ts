import { Config } from '../../constants/Config';
import { Habit } from '../types/habit';
import { EnergyScore } from '../types/energy';

export function calculateEnergyScore(
  habits: Habit[],
  date: string
): EnergyScore {
  const completedToday = habits.filter((h) =>
    h.completedDates.includes(date)
  );

  const pillarScores = {
    sleep: 0,
    nutrition: 0,
    hydration: 0,
    movement: 0,
  };

  const pillarCounts = {
    sleep: 0,
    nutrition: 0,
    hydration: 0,
    movement: 0,
  };

  habits.forEach((habit) => {
    pillarCounts[habit.pillar]++;
    if (completedToday.find((h) => h.id === habit.id)) {
      pillarScores[habit.pillar]++;
    }
  });

  const sleep = pillarCounts.sleep > 0
    ? (pillarScores.sleep / pillarCounts.sleep) * 100
    : 0;
  const nutrition = pillarCounts.nutrition > 0
    ? (pillarScores.nutrition / pillarCounts.nutrition) * 100
    : 0;
  const hydration = pillarCounts.hydration > 0
    ? (pillarScores.hydration / pillarCounts.hydration) * 100
    : 0;
  const movement = pillarCounts.movement > 0
    ? (pillarScores.movement / pillarCounts.movement) * 100
    : 0;

  const avgStreak = habits.length > 0
    ? habits.reduce((sum, h) => sum + h.streak, 0) / habits.length
    : 0;
  const consistency = Math.min((avgStreak / 7) * 100, 100);

  const total =
    sleep * Config.energyWeights.sleep +
    nutrition * Config.energyWeights.nutrition +
    hydration * Config.energyWeights.hydration +
    movement * Config.energyWeights.movement +
    consistency * Config.energyWeights.consistency;

  return {
    total: Math.round(total),
    sleep: Math.round(sleep),
    nutrition: Math.round(nutrition),
    hydration: Math.round(hydration),
    movement: Math.round(movement),
    consistency: Math.round(consistency),
    date,
  };
}
