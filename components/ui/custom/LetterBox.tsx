type LetterBoxType = {
  letter: string;
};

function LetterBox({ letter }: LetterBoxType) {
  return (
    <>
      <p>{letter}</p>
    </>
  );
}

export default LetterBox;
