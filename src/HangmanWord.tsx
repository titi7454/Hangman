type HangmanWordProps = {
  guessedLetters: string[];
  wordGuess: string;
  reveal: boolean;
  score: number;
};

export function HangmanWord({
  guessedLetters,
  wordGuess,
  reveal,
  score,
}: HangmanWordProps) {
  return (
    <div className="wordmain">
      <div className="word">
        {wordGuess.split("").map((letter, id) => (
          <span className="letter" key={id}>
            <span
              style={{
                visibility:
                  guessedLetters.includes(letter) || reveal
                    ? "visible"
                    : "hidden",
                color:
                  !guessedLetters.includes(letter) && reveal ? "red" : "black",
              }}
            >
              {" "}
              {letter}
            </span>
          </span>
        ))}
      </div>
      <div className="score">score:{score}</div>
    </div>
  );
}
