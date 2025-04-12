type LetterBoxType = {
  letter: string;
  status: number;
};

function LetterBox({ letter, status }: LetterBoxType) {
  let backgroundColor;

  if (status === 0) {
    backgroundColor = 'bg-white'; // Neutral
  } else if (status === 1) {
    backgroundColor = 'bg-gray-500'; // Incorrect
  } else if (status === 2) {
    backgroundColor = 'bg-yellow-500'; // Partial
  } else if (status === 3) {
    backgroundColor = 'bg-green-500'; // Match
  }

  return (
    <div
      className={`border-2 p-4 min-w-12 min-h-16 text-center ${backgroundColor}`}
    >
      {/* If no letter add empty space  */}
      <p>{letter}</p>
    </div>
  );
}

export default LetterBox;
