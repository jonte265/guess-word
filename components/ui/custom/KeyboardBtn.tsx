import { Button } from '@/components/ui/button';

type keyboardType = {
  text: string;
  onClick: () => void;
};

function KeyboardBtn({ text, onClick }: keyboardType) {
  return (
    <Button
      variant='outline'
      size='icon'
      className='w-8 h-10 sm:w-12 sm:h-12'
      onClick={onClick}
    >
      {text}
    </Button>
  );
}

export default KeyboardBtn;
