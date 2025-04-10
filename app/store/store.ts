import words from '@/app/data/words.json';
import { create } from 'zustand';

type wordStoreType = {
  count: number;
  chosenWord: string;
  gameStart: boolean;
  increment: () => void;
  startGame: () => void;
};

const useWordStore = create<wordStoreType>((set) => ({
  count: 0,
  chosenWord: 'default',
  gameStart: false,

  increment: () => set((state) => ({ count: state.count + 1 })),

  startGame: () =>
    set(() => {
      return {
        gameStart: true,
        chosenWord: words[Math.floor(Math.random() * words.length)],
      };
    }),
}));

export default useWordStore;
