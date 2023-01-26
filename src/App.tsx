import { useCallback, useEffect, useState } from "react";
import words from "./wordList.json";
import { HangmanDrawing } from "./HangmanDrawing";
import { HangmanWord } from "./HangmanWord";
import { Keyboard } from "./Keyboard";
import "./App.css";

function getWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function App() {
  const [wordGuess, setWordGuess] = useState<string>(getWord);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const [canUseHint, setCanUseHint] = useState<boolean>(true);

  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordGuess.includes(letter)
  );

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordGuess
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const getHint = () => {
    if (isLoser || isWinner) return;
    const guessedLetterCopy = guessedLetters;
    const wordGuessCopy = wordGuess;

    const hintWord = wordGuessCopy
      .split("")
      .filter((letter) => !guessedLetterCopy.includes(letter));

    const hintLetter = hintWord[Math.floor(Math.random() * hintWord.length)];

    if (!guessedLetterCopy.includes(hintLetter)) {
      setGuessedLetters((currentLetters) => [...currentLetters, hintLetter]);
      setCanUseHint(false);
    }
  };

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return;

      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters, isLoser, isWinner]
  );

  const checkWinner = () => {
    if (isWinner) {
      setScore((prevScore) => prevScore + 1);
      setGuessedLetters([]);
      setWordGuess(getWord());
      setCanUseHint(true);
    }

    if (isLoser) {
      setScore(0);
      setGuessedLetters([]);
      setWordGuess(getWord());
      setCanUseHint(true);
    }
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/)) return;
      
      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (key !== "Enter") return;

      e.preventDefault();
      checkWinner();
    };
    document.addEventListener("keypress", handler);
    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters]);

  return (
    <div className="main">
      <div className="outcome">
        {isLoser && "You lose :( Press enter to restart."}{" "}
        {isWinner &&
          "You win! Congratulations! Press enter to continue your streak"}
      </div>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord
        reveal={isLoser}
        guessedLetters={guessedLetters}
        wordGuess={wordGuess}
        score={score}
      />
      <div style={{ alignSelf: "stretch", padding: "1rem" }}>
        <Keyboard
          disabled={isWinner || isLoser}
          activeLetters={guessedLetters.filter((letter) =>
            wordGuess.includes(letter)
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
          getHint={getHint}
          canUseHint={canUseHint}
        />
      </div>
    </div>
  );
}

export default App;
