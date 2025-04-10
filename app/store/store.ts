import words from '@/app/data/words.json';
import { create } from 'zustand';

type wordStoreType = {
  count: number;
  chosenWord: string;
  chosenWordSplit: string[];
  guess: string;
  guessArr: string[];
  gameStart: boolean;
  increment: () => void;
  startGame: () => void;
  enterInput: (letter: string) => void;
};

const useWordStore = create<wordStoreType>((set) => ({
  count: 0,
  chosenWord: 'default',
  chosenWordSplit: [],
  gameStart: false,
  guess: '',
  guessArr: [],

  increment: () => set((state) => ({ count: state.count + 1 })),

  startGame: () =>
    set((state) => {
      const newWord = words[Math.floor(Math.random() * words.length)];

      return {
        gameStart: true,
        chosenWord: newWord,
        chosenWordSplit: newWord.split(''),
      };
    }),

  enterInput: (letter) =>
    set((state) => {
      const newGuess = state.guess + letter;

      if (newGuess.length <= state.chosenWord.length) {
        return {
          guess: newGuess,
          guessArr: newGuess.split(''),
        };
      }

      return {};
    }),
}));

export default useWordStore;
