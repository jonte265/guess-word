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
  gameWin: boolean;
  gameBoard: Cell[][];
  rowIndex: number;
  cellIndex: number;
  startGame: () => void;
  backspaceInput: () => void;
  enterInput: (alp: string) => void;
  submitGuess: () => void;
};

const useWordStore = create<wordStoreType>((set) => ({
  chosenWord: '',
  guess: '',
  gameStart: false,
  gameOver: false,
  gameWin: false,

  gameBoard: [],
  rowIndex: 0,
  cellIndex: 0,

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
        rowIndex: 0,
        cellIndex: 0,
      };
    }),

  enterInput: (alp) =>
    set((state) => {
      if (state.guess.length >= state.chosenWord.length) {
        return {};
      }

      const newGuess = state.guess + alp;

      const newGameBoard = state.gameBoard.map((row) =>
        row.map((cell) => ({ ...cell }))
      );

      console.log('newgameboard:', newGameBoard);

      newGameBoard[state.rowIndex][state.cellIndex].letter = alp;

      return {
        guess: newGuess,
        gameBoard: newGameBoard,
        cellIndex: state.cellIndex + 1,
      };
    }),

  backspaceInput: () =>
    set((state) => {
      if (state.cellIndex <= 0) {
        return {};
      }

      const newCellIndex = state.cellIndex - 1;

      const newGuess = state.guess.slice(0, -1);

      const newGameBoard = state.gameBoard.map((row) =>
        row.map((cell) => ({ ...cell }))
      );

      console.log('newgameboard:', newGameBoard);

      newGameBoard[state.rowIndex][newCellIndex].letter = '';

      return {
        guess: newGuess,
        gameBoard: newGameBoard,
        cellIndex: newCellIndex,
      };
    }),

  submitGuess: () =>
    set((state) => {
      console.log('guess:', state.guess);
      console.log('chosenWord:', state.chosenWord);

      if (state.guess.toUpperCase() === state.chosenWord.toUpperCase()) {
        return {
          gameWin: true,
        };
      } else {
        return {
          rowIndex: state.rowIndex + 1,
          guess: '',
        };
      }
    }),
}));

export default useWordStore;
