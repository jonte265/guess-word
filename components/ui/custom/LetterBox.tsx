type LetterBoxType = {
  letter: string;
  status: number;
};

function LetterBox({ letter, status }: LetterBoxType) {
  let backgroundColor;
  let textColor;

  if (status === 0) {
    backgroundColor = 'bg-white dark:bg-gray-900'; // Neutral
    textColor = 'text-black dark:text-white';
  } else if (status === 1) {
    backgroundColor = 'bg-gray-200 dark:bg-gray-700'; // Incorrect
    textColor = 'text-black dark:text-white';
  } else if (status === 2) {
    backgroundColor = 'bg-yellow-500 dark:bg-yellow-300'; // Partial
    textColor = 'text-black dark:text-black';
  } else if (status === 3) {
    backgroundColor = 'bg-green-500 dark:bg-green-400'; // Match
    textColor = 'text-black dark:text-black';
  }

  return (
    <div
      className={`flex justify-center items-center border-2 dark:border-gray-500 p-4 w-12 h-16 text-center ${backgroundColor}`}
    >
      {/* If no letter add empty space */}
      <p className={`font-semibold ${textColor}`}>{letter.toUpperCase()}</p>
    </div>
  );
}

export default LetterBox;
