export interface EnergyScore {
  total: number;
  sleep: number;
  nutrition: number;
  hydration: number;
  movement: number;
  consistency: number;
  date: string;
}

export interface CheckIn {
  id: string;
  date: string;
  energyLevel: number;
  symptoms: string[];
  timestamp: string;
}

export const SYMPTOMS = [
  'Brain Fog',
  'Fadiga',
  'Ansiedade',
  'Foco',
  'Energia',
  'Produtividade',
  'Clareza Mental',
  'Motivação',
];
