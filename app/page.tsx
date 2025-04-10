import { Button } from '@/components/ui/button';
import GameArea from '@/components/ui/custom/GameArea';
import Image from 'next/image';

export default function Home() {
  return (
    <main className='p-4'>
      <GameArea />
      <Button>Click me</Button>
    </main>
  );
}
