'use client';

import useWordStore from '@/app/store/store';
import { ModeToggle } from '../ModeToggle';

function HeaderNav() {
  const wordStore = useWordStore();

  return (
    <header className='flex flex-row flex-wrap justify-between items-center p-4 max-w-2xl mx-auto'>
      <h2 className='font-semibold'>Ordle</h2>
      <p>
        Win streak: <strong>{wordStore.winStreak} 🏆</strong>
      </p>
      <ModeToggle />
    </header>
  );
}

export default HeaderNav;
