'use client';

import { Button } from '@/components/ui/button';
import words from '@/app/data/words.json';
import alphabet from '@/app/data/alphabet.json';
import alphabetKeyboard from '@/app/data/alphabetKeyboard.json';
import useWordStore from '@/app/store/store';

type GameAreaType = {
  alp: string;
};

function GameArea() {
  const wordStore = useWordStore();

  return (
    <section className='flex flex-col justify-center items-center max-w-2xl m-auto'>
      {/* KeyBoard */}
      <div className='flex flex-wrap justify-evenly items-center w-120'>
        {alphabetKeyboard.map((alp: string, index: number) => {
          return (
            <Button key={index} variant='outline'>
              {alp}
            </Button>
          );
        })}
      </div>

      <Button onClick={wordStore.increment}>Click me</Button>
      <p>{wordStore.count}</p>
    </section>
  );
}

export default GameArea;
