type LetterBoxType = {
  letter: string;
  status: number;
};

function LetterBox({ letter, status }: LetterBoxType) {
  let backgroundColor;

  if (status === 1) {
    backgroundColor = 'bg-green-500'; // Match
  } else if (status === 2) {
    backgroundColor = 'bg-yellow-500'; // Partial
  } else if (status === 3) {
    backgroundColor = 'bg-gray-500'; // Incorrect
  } else {
    backgroundColor = 'bg-white'; // Neutral
  }

  return (
    <div className={`border-2 p-4 min-w-12 text-center ${backgroundColor}`}>
      {/* If no letter add empty space  */}
      <p>{letter ? letter.toUpperCase() : '\u00A0'}</p>
    </div>
  );
}

export default LetterBox;
