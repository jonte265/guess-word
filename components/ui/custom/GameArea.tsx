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

  return (
    <section className='flex flex-col gap-4 justify-center items-center max-w-2xl m-auto'>
      {wordStore.gameStart ? (
        <>
          {/* Question area */}
          <h1 className='text-2xl'>{wordStore.chosenWord}</h1>
          <div className='flex flex-wrap justify-center items-center gap-1'>
            {wordStore.chosenWord.split('').map((letr, index) => {
              return <LetterBox key={index} letter={letr} />;
            })}
          </div>
          <LetterBox letter='a' />
          {/* Keyboard */}
          <div className='flex flex-wrap justify-evenly items-center w-120'>
            {alphabetKeyboard.map((alp: string, index: number) => {
              return (
                <Button key={index} variant='outline'>
                  {alp}
                </Button>
              );
            })}
          </div>
        </>
      ) : (
        <Button onClick={wordStore.startGame}>Start</Button>
      )}
    </section>
  );
}

export default GameArea;
