import alphabet from '@/app/data/alphabet.json';
import { create } from 'zustand';

type wordStoreType = {
  count: number;
  chosenWord: string;
  increment: () => void;
  randomWord: () => void;
};

const useWordStore = create<wordStoreType>((set) => ({
  count: 0,
  chosenWord: 'default',

  increment: () => set((state) => ({ count: state.count + 1 })),

  randomWord: () =>
    set(() => {
      return {
        chosenWord: 'Banan',
      };
    }),
}));

export default useWordStore;
