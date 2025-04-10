type LetterBoxType = {
  letter: string;
};

function LetterBox({ letter }: LetterBoxType) {
  return (
    <div className='border-2 p-4'>
      <p>{letter.toUpperCase()}</p>
    </div>
  );
}

export default LetterBox;
