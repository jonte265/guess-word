import words from '@/app/data/words.json';
import { create } from 'zustand';

type wordStoreType = {
  chosenWord: string;
  guess: string;
  gameStart: boolean;
  gameOver: boolean;
  startGame: () => void;
  enterInput: (alp: string) => void;
};

const useWordStore = create<wordStoreType>((set) => ({
  chosenWord: '',
  guess: '',
  gameStart: false,
  gameOver: false,

  startGame: () =>
    set((state) => {
      const newWord = words[Math.floor(Math.random() * words.length)];

      return {
        chosenWord: newWord,
        gameStart: true,
      };
    }),

  enterInput: (alp) =>
    set((state) => {
      if (state.guess.length >= state.chosenWord.length) {
        return {};
      }

      return {
        guess: state.guess + alp,
      };
    }),
}));

export default useWordStore;
