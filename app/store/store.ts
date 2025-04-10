import words from '@/app/data/words.json';
import { create } from 'zustand';

type wordStoreType = {
  chosenWord: string;
  chosenWordSplit: string[];
  guess: string;
  guessArr: string[];
  guessRow: number;
  guessLetterBox: number;
  gameArr: string[][];
  gameStart: boolean;

  startGame: () => void;
  backspaceInput: () => void;
  enterInput: (letter: string) => void;
};

const useWordStore = create<wordStoreType>((set) => ({
  chosenWord: 'default',
  chosenWordSplit: [],

  guess: '',
  guessArr: [],
  guessRow: 0,
  guessLetterBox: 0,

  gameArr: [],

  gameStart: false,

  startGame: () =>
    set((state) => {
      const newWord = words[Math.floor(Math.random() * words.length)];

      return {
        gameStart: true,
        chosenWord: newWord,
        chosenWordSplit: newWord.split(''),
        gameArr: [
          new Array(newWord.length).fill(''),
          new Array(newWord.length).fill(''),
          new Array(newWord.length).fill(''),
          new Array(newWord.length).fill(''),
          new Array(newWord.length).fill(''),
          new Array(newWord.length).fill(''),
        ],
      };
    }),

  enterInput: (letter) =>
    set((state) => {
      const newGuess = state.guess + letter;

      // Stop if guess too long
      if (newGuess.length > state.chosenWord.length) {
        return {};
      }

      const updateGamerArr = [...state.gameArr];

      // Update row with guess
      updateGamerArr[state.guessRow][state.guessLetterBox] = letter;

      return {
        guess: newGuess,
        guessArr: newGuess.split(''),
        gameArr: updateGamerArr,

        guessLetterBox: state.guessLetterBox + 1,
      };
    }),

  backspaceInput: () =>
    set((state) => {
      if (state.guessLetterBox === 0) {
        return {};
      }

      const updateGamerArr = [...state.gameArr];

      updateGamerArr[state.guessRow][state.guessLetterBox - 1] = '';

      const updatedGuess = state.guess.slice(0, -1);

      return {
        guess: updatedGuess,
        guessArr: updatedGuess.split(''),
        gameArr: updateGamerArr,

        guessLetterBox: state.guessLetterBox - 1,
      };
    }),
}));

export default useWordStore;
