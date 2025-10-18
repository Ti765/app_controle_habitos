import { EnergyScore } from '../types/energy';

export interface Pattern {
  title: string;
  description: string;
  trend: 'up' | 'down' | 'stable';
}

export function analyzePatterns(scores: EnergyScore[]): Pattern[] {
  if (scores.length < 3) {
    return [
      {
        title: 'Continue Registrando',
        description: 'Mantenha seus hábitos por mais dias para ver padrões',
        trend: 'stable',
      },
    ];
  }

  const patterns: Pattern[] = [];
  const recent = scores.slice(-7);
  const previous = scores.slice(-14, -7);

  const recentAvg = recent.reduce((sum, s) => sum + s.total, 0) / recent.length;
  const previousAvg = previous.length > 0
    ? previous.reduce((sum, s) => sum + s.total, 0) / previous.length
    : recentAvg;

  if (recentAvg > previousAvg + 10) {
    patterns.push({
      title: 'Energia em Alta',
      description: `Sua energia aumentou ${Math.round(recentAvg - previousAvg)}% esta semana`,
      trend: 'up',
    });
  } else if (recentAvg < previousAvg - 10) {
    patterns.push({
      title: 'Atenção Necessária',
      description: `Sua energia caiu ${Math.round(previousAvg - recentAvg)}% esta semana`,
      trend: 'down',
    });
  } else {
    patterns.push({
      title: 'Consistência Mantida',
      description: 'Você está mantendo níveis estáveis de energia',
      trend: 'stable',
    });
  }

  const bestPillar = ['sleep', 'nutrition', 'hydration', 'movement'].reduce(
    (best, pillar) => {
      const avg = recent.reduce((sum, s) => {
        const value = s[pillar as keyof EnergyScore];
        return sum + (typeof value === 'number' ? value : 0);
      }, 0) / recent.length;
      return avg > best.score ? { pillar, score: avg } : best;
    },
    { pillar: 'sleep', score: 0 }
  );

  patterns.push({
    title: 'Seu Ponto Forte',
    description: `${pillarNames[bestPillar.pillar as keyof typeof pillarNames]} está com ${Math.round(bestPillar.score)}% de performance`,
    trend: 'up',
  });

  return patterns;
}

const pillarNames = {
  sleep: 'Sono',
  nutrition: 'Nutrição',
  hydration: 'Hidratação',
  movement: 'Movimento',
};
