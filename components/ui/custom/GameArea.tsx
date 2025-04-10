'use client';

import { Button } from '@/components/ui/button';
import words from '@/app/data/words.json';
import alphabet from '@/app/data/alphabet.json';
import alphabetKeyboard from '@/app/data/alphabetKeyboard.json';
import useWordStore from '@/app/store/store';
import { useEffect } from 'react';
import LetterBox from './LetterBox';

type GameAreaType = {
  alp: string;
};

function GameArea() {
  const wordStore = useWordStore();

  console.log('chosenWordSplit', wordStore.chosenWordSplit);
  console.log('guessArr', wordStore.guessArr);

  return (
    <section className='flex flex-col gap-4 justify-center items-center max-w-2xl m-auto'>
      {wordStore.gameStart ? (
        <>
          {/* Question area */}
          <h1 className='text-2xl'>Chosenword: {wordStore.chosenWord}</h1>
          <h1 className='text-2xl'>
            chosenWordSplit: {wordStore.chosenWordSplit}
          </h1>
          <h1 className='text-2xl'>guess: {wordStore.guess}</h1>
          <h1 className='text-2xl'>guessArr: {wordStore.guessArr}</h1>

          <div className='flex flex-wrap justify-center items-center gap-1'>
            {wordStore.chosenWord.split('').map((letr, index) => {
              return <LetterBox key={index} letter={letr} />;
            })}
          </div>
          <div className='flex flex-wrap justify-center items-center gap-1'>
            {wordStore.guess.split('').map((letr, index) => {
              return <LetterBox key={index} letter={letr} />;
            })}
          </div>

          <div className='flex flex-wrap justify-center items-center gap-1'>
            {wordStore.guessArr.map((letr, index) => {
              return <LetterBox key={index} letter={letr} />;
            })}
          </div>

          <div className='flex flex-wrap justify-center items-center gap-1'>
            {wordStore.chosenWordSplit.map((guess, index) => {
              return (
                <div>
                  <LetterBox key={index} letter='b' />
                  <LetterBox key={index} letter='b' />
                  <LetterBox key={index} letter='b' />
                  <LetterBox key={index} letter='b' />
                  <LetterBox key={index} letter='b' />
                  <LetterBox key={index} letter='b' />
                </div>
              );
            })}
          </div>

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
              variant='outline'
              size='lg'
              className='flex-1 min-w-[50px] m-1'
            >
              🔙
            </Button>
            <Button
              variant='outline'
              size='lg'
              className='flex-1 min-w-[50px] m-1'
            >
              Submit
            </Button>
          </div>

          <p>Guess: {wordStore.guess}</p>
        </>
      ) : (
        <Button onClick={wordStore.startGame}>Start</Button>
      )}
    </section>
  );
}

export default GameArea;
