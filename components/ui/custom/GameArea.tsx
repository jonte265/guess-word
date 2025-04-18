'use client';

import { motion } from 'motion/react';
import words from '@/app/data/words.json';
import { Button } from '@/components/ui/button';
import alphabetKeyboard from '@/app/data/alphabetKeyboard.json';
import useWordStore from '@/app/store/store';
import LetterBox from './LetterBox';
import { useEffect, useState } from 'react';

// type GameAreaType = {
//   alp: string;
// };

function GameArea() {
  const wordStore = useWordStore();

  const [random, setRandom] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRandom(Math.floor(Math.random() * words.length));
    }, 1500);

    return () => clearTimeout(timer);
  });

  return (
    <section className='flex flex-col gap-4 justify-center items-center max-w-2xl m-auto'>
      {wordStore.gameStart ? (
        <>
          {/* Question area */}
          {/* <h1 className='text-2xl'>Chosenword: {wordStore.chosenWord}</h1>
          <h1 className='text-2xl'>Guess: {wordStore.guess}</h1> */}

          <div className='flex justify-center items-center flex-col gap-4'>
            {wordStore.gameBoard.map((row, rowIndex) => (
              <div
                className='flex gap-2 justify-center items-center'
                key={rowIndex}
              >
                {row.map((cell, colIndex) => (
                  <LetterBox
                    key={colIndex}
                    letter={cell.letter}
                    status={cell.correct}
                  />
                ))}
              </div>
            ))}
          </div>

          {wordStore.gameWin === true && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className='flex flex-col items-center gap-2'
            >
              <h1 className='text-2xl pb-2'>Correct! 🏆</h1>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Button onClick={wordStore.startGame}>Play Again</Button>
              </motion.div>
            </motion.div>
          )}
          {wordStore.gameOver === true && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className='flex flex-col items-center gap-2'
            >
              <h1 className='text-2xl'>Game Over!</h1>
              <h1 className='text-2xl font-semibold'>Answer:</h1>
              <div className='flex gap-2 items-center justify-center pb-2'>
                {wordStore.chosenWord.split('').map((word, index) => (
                  <div key={index} className='flex justify-center items-center'>
                    <LetterBox status={0} letter={word} />
                  </div>
                ))}
              </div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Button onClick={wordStore.startGame}>Play Again</Button>
              </motion.div>
            </motion.div>
          )}

          {/* Keyboard */}
          <div className='flex flex-col gap-2 mt-4'>
            <div className='flex justify-center items-center gap-1'>
              {alphabetKeyboard.top_row.map((alp: string, index: number) => (
                <Button
                  key={index}
                  variant='outline'
                  size='icon'
                  className='w-8 h-10 sm:w-12 sm:h-12'
                  onClick={() => wordStore.enterInput(alp)}
                >
                  {alp}
                </Button>
              ))}
            </div>
            <div className='flex justify-center items-center gap-1'>
              {alphabetKeyboard.middle_row.map((alp: string, index: number) => (
                <Button
                  key={index}
                  variant='outline'
                  size='icon'
                  className='w-8 h-10 sm:w-12 sm:h-12'
                  onClick={() => wordStore.enterInput(alp)}
                >
                  {alp}
                </Button>
              ))}
            </div>
            <div className='flex justify-center items-center gap-1'>
              <Button
                onClick={wordStore.backspaceInput}
                variant='secondary'
                size='icon'
                className='w-12 h-10 sm:w-16 sm:h-12 font-bold'
              >
                ←
              </Button>
              {alphabetKeyboard.bottom_row.map((alp: string, index: number) => (
                <Button
                  key={index}
                  variant='outline'
                  size='icon'
                  className='w-8 h-10 sm:w-12 sm:h-12'
                  onClick={() => wordStore.enterInput(alp)}
                >
                  {alp}
                </Button>
              ))}

              <Button
                onClick={wordStore.submitGuess}
                size='lg'
                className='w-18 h-10 sm:h-12'
              >
                Submit
              </Button>
            </div>
          </div>

          {/* {wordStore.gameWin ? <h2>You won!</h2> : <h2>You've NOT won</h2>} */}
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className='flex flex-col gap-8 justify-center items-center'
        >
          <h1 className='text-2xl'>Guess the right word in 5 guesses!</h1>
          <div className='flex gap-2 items-center justify-center'>
            {words[random].split('').map((word, index) => {
              return (
                <div key={index} className='flex justify-center items-center'>
                  <LetterBox status={0} letter={word} />
                </div>
              );
            })}
          </div>
          <h2 className='text-xl font-semibold'>How to Play</h2>
          <div>
            <p>
              Guess the <strong>5</strong>-letter word.
            </p>
            <p>
              You have <strong>6</strong> tries.
            </p>
            <p>After each guess, the colors show how close you are:</p>
            <p>
              🟩 <strong>Green</strong>: Correct letter in the correct spot.
            </p>
            <p>
              🟨 <strong>Yellow</strong>: Letter is in the word but in the wrong
              spot.
            </p>
            <p>
              ⬜ <strong>Gray</strong>: Letter is not in the word.
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Button onClick={wordStore.startGame}>Start</Button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

export default GameArea;
