import { create } from 'zustand';
import { CheckIn } from '../lib/types/energy';
import { energyStorage } from '../lib/storage/energy-storage';

interface EnergyState {
  checkIns: CheckIn[];
  loading: boolean;
  loadCheckIns: () => Promise<void>;
  addCheckIn: (checkIn: CheckIn) => Promise<void>;
}

export const useEnergyStore = create<EnergyState>((set, get) => ({
  checkIns: [],
  loading: false,

  loadCheckIns: async () => {
    set({ loading: true });
    const checkIns = await energyStorage.getCheckIns();
    set({ checkIns, loading: false });
  },

  addCheckIn: async (checkIn: CheckIn) => {
    await energyStorage.saveCheckIn(checkIn);
    const { checkIns } = get();
    set({ checkIns: [...checkIns, checkIn] });
  },
}));
