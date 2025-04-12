import words from '@/app/data/words.json';
import { create } from 'zustand';

type Cell = {
  letter: string;
  correct: number;
};

type wordStoreType = {
  chosenWord: string;
  guess: string;
  gameStart: boolean;
  gameOver: boolean;
  gameBoard: Cell[][];
  rowIndex: number;
  startGame: () => void;
  enterInput: (alp: string) => void;
};

const useWordStore = create<wordStoreType>((set) => ({
  chosenWord: '',
  guess: '',
  gameStart: false,
  gameOver: false,

  gameBoard: [],
  rowIndex: 0,

  startGame: () =>
    set((state) => {
      const newWord = words[Math.floor(Math.random() * words.length)];

      const gameBoard = Array(6)
        .fill(null)
        .map(() => Array(newWord.length).fill({ letter: '', correct: 0 }));

      return {
        chosenWord: newWord,
        gameStart: true,
        gameBoard: gameBoard,
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
