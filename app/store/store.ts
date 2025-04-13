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
    set(() => {
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
        gameWin: false,
        gameOver: false,
        guess: '',
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
      console.log('rowIndex:', state.rowIndex);
      console.log('cellIndex:', state.cellIndex);

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
      if (state.rowIndex >= 6) {
        return {};
      }

      if (state.guess.length < state.chosenWord.length) {
        return {};
      }

      console.log('guess:', state.guess);
      console.log('chosenWord:', state.chosenWord);

      const newGameBoard = state.gameBoard.map((row) =>
        row.map((cell) => ({ ...cell }))
      );

      const splitChosenWord = state.chosenWord.split('');

      console.log('splitChosenWord:', splitChosenWord);

      // Make boxes gray,green,yellow
      splitChosenWord.forEach((split, index) => {
        console.log('körs! Index: + split:', index, split);

        // Count how many letters i used
        const letterCountWord = splitChosenWord;
        console.log('letterCountWord : ', letterCountWord);

        // Default grey box
        newGameBoard[state.rowIndex][index].correct = 1;

        const currentLetter =
          newGameBoard[state.rowIndex][index].letter.toUpperCase();

        // If match, green box
        if (currentLetter === split.toUpperCase()) {
          console.log(
            'MATCH:',
            newGameBoard[state.rowIndex][index].letter + split
          );

          newGameBoard[state.rowIndex][index].correct = 3;

          const indexRemove = letterCountWord.indexOf(currentLetter);

          letterCountWord.splice(indexRemove, 1);

          console.log('letterCountWord : ', letterCountWord);
        } else if (
          // If Contains, yellow box
          state.chosenWord.toUpperCase().includes(currentLetter) &&
          letterCountWord.includes(currentLetter)
        ) {
          console.log(
            'PARTIAL MATCH:',
            newGameBoard[state.rowIndex][index].letter +
              split.toUpperCase().includes(currentLetter)
          );

          newGameBoard[state.rowIndex][index].correct = 2;
        }
      });

      console.log('newgameboard:', newGameBoard);

      // Check if correct guess
      if (state.guess.toUpperCase() === state.chosenWord.toUpperCase()) {
        return {
          gameWin: true,
          gameBoard: newGameBoard,
        };
      } else if (state.rowIndex >= 5) {
        console.log('Game over');
        return {
          gameOver: true,
          gameBoard: newGameBoard,
        };
      } else {
        return {
          rowIndex: state.rowIndex + 1,
          cellIndex: 0,
          guess: '',
          gameBoard: newGameBoard,
        };
      }
    }),
}));

export default useWordStore;
