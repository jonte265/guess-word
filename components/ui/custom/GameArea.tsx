'use client';

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
            <>
              <h1 className='text-2xl'>Correct!</h1>
              <Button onClick={wordStore.startGame}>Play Again</Button>
            </>
          )}
          {wordStore.gameOver === true && (
            <>
              <h1 className='text-2xl'>Game Over!</h1>
              <h1 className='text-2xl font-semibold'>Answer:</h1>
              <div className='flex gap-2 items-center justify-center'>
                {wordStore.chosenWord.split('').map((word, index) => {
                  return (
                    <div
                      key={index}
                      className='flex justify-center items-center'
                    >
                      <LetterBox letter={word} />
                    </div>
                  );
                })}
              </div>
              <Button onClick={wordStore.startGame}>Play Again</Button>
            </>
          )}

          {/* Keyboard */}
          <div className='flex flex-wrap justify-center items-center sm:w-auto p-2 border rounded-lg'>
            {alphabetKeyboard.map((alp: string, index: number) => (
              <Button
                key={index}
                variant='outline'
                size='lg'
                className='flex-1 min-w-[50px] m-1 text-center'
                onClick={() => wordStore.enterInput(alp)}
              >
                {alp}
              </Button>
            ))}

            <Button
              onClick={wordStore.backspaceInput}
              variant='outline'
              size='lg'
              className='flex-1 min-w-[50px] m-1'
            >
              🔙
            </Button>
            <Button
              onClick={wordStore.submitGuess}
              variant='outline'
              size='lg'
              className='flex-1 min-w-[50px] m-1'
            >
              Submit
            </Button>
          </div>

          {wordStore.gameWin ? <h2>You won!</h2> : <h2>You've NOT won</h2>}
        </>
      ) : (
        <div className='flex flex-col gap-8 justify-center items-center'>
          <h1 className='text-2xl'>Guess the right word in 5 guesses!</h1>
          <div className='flex gap-2 items-center justify-center'>
            {words[random].split('').map((word, index) => {
              return (
                <div key={index} className='flex justify-center items-center'>
                  <LetterBox letter={word} />
                </div>
              );
            })}
          </div>
          <Button onClick={wordStore.startGame}>Start</Button>
        </div>
      )}
    </section>
  );
}

export default GameArea;
