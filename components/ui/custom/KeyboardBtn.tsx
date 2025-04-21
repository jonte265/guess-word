import { Button } from '@/components/ui/button';
import useWordStore from '@/app/store/store';

type keyboardType = {
  text: string;
  onClick: () => void;
};

function KeyboardBtn({ text, onClick }: keyboardType) {
  const wordStore = useWordStore();
  let bgColor = '';
  let textColor;

  // Find the highest status for this letter across all guesses (3=green, 2=yellow, 1=gray)
  const maxStatus = wordStore.gameBoard
    .flat()
    .filter((item) => item.letter.toUpperCase() === text.toUpperCase())
    .reduce((max, item) => Math.max(max, item.correct), 0);

  if (maxStatus === 1) {
    bgColor = 'bg-gray-200 dark:bg-gray-700';
    textColor = 'text-black dark:text-white';
  } else if (maxStatus === 2) {
    bgColor = 'bg-yellow-500 dark:bg-yellow-300';
    textColor = 'text-black dark:text-black';
  } else if (maxStatus === 3) {
    bgColor = 'bg-green-500 dark:bg-green-400';
    textColor = 'text-black dark:text-black';
  }

  return (
    <Button
      variant='outline'
      size='icon'
      className={`w-8 h-10 sm:w-12 sm:h-12 ${bgColor} ${textColor}`}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}

export default KeyboardBtn;
