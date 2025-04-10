type LetterBoxType = {
  letter: string;
};

function LetterBox({ letter }: LetterBoxType) {
  return (
    <div className='border-2 p-4 min-w-12 text-center'>
      {/* If no letter add empty space  */}
      <p>{letter ? letter.toUpperCase() : '\u00A0'}</p>
    </div>
  );
}

export default LetterBox;
