export const Config = {
  energyWeights: {
    sleep: 0.25,
    nutrition: 0.20,
    hydration: 0.15,
    movement: 0.20,
    consistency: 0.20,
  },
  checkboxSize: 28,
  energyRingSize: 160,
  energyRingStroke: 12,
  animationDuration: 300,
  pillars: [
    {
      id: 'sleep',
      title: 'Sono',
      emoji: '😴',
      color: '#6366f1',
    },
    {
      id: 'nutrition',
      title: 'Nutrição',
      emoji: '🥗',
      color: '#10b981',
    },
    {
      id: 'hydration',
      title: 'Hidratação',
      emoji: '💧',
      color: '#06b6d4',
    },
    {
      id: 'movement',
      title: 'Movimento',
      emoji: '🏃',
      color: '#f59e0b',
    },
  ],
};
