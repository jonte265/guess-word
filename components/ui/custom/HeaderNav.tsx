'use client';
import { Button } from '@/components/ui/button';
import useWordStore from '@/app/store/store';

function HeaderNav() {
  const wordStore = useWordStore();

  return (
    <header className='flex flex-row flex-wrap justify-between items-center p-4'>
      <h2 className='font-semibold'>Ordle</h2>
      {/* <nav className=''>
        <ul className='flex gap-4'>
          <li>
            <Button variant='outline'>Hej</Button>
          </li>
          <li>
            <Button variant='outline'>Hej</Button>
          </li>
          <li>
            <Button variant='outline'>Hej</Button>
          </li>
        </ul>
      </nav> */}
      <p>
        Win streak: <strong>{wordStore.winStreak}</strong>
      </p>
    </header>
  );
}

export default HeaderNav;
