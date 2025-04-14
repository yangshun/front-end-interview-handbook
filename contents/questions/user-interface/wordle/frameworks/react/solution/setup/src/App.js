import { useCallback, useEffect, useState } from 'react';

const LETTER_GUESS_STATE = Object.freeze({
  INDETERMINATE: 'INDETERMINATE',
  ABSENT: 'ABSENT',
  PRESENT: 'PRESENT',
  CORRECT: 'CORRECT',
});

const LETTER_GUESS_STATE_PRIORITY = Object.freeze({
  INDETERMINATE: 1,
  ABSENT: 2,
  PRESENT: 3,
  CORRECT: 4,
});

const GAME_STATE = Object.freeze({
  IN_PROGRESS: 'IN_PROGRESS',
  GUESSED_CORRECTLY: 'GUESSED_CORRECTLY',
  NO_MORE_GUESSES: 'NO_MORE_GUESSES',
});

const GUESS_CLASSES = Object.freeze({
  CORRECT: 'guess--correct',
  PRESENT: 'guess--present',
  ABSENT: 'guess--absent',
});

const KEYBOARD_LAYOUT = Object.freeze([
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace'],
]);

const WORDS = Object.freeze([
  'APPLE',
  'BEAST',
  'FAINT',
  'FEAST',
  'FRUIT',
  'GAMES',
  'PAINT',
  'PASTE',
  'TOWER',
  'REACT',
]);

const A_KEYCODE = 65;
const Z_KEYCODE = 90;

function isValidKey(key) {
  return (
    key === 'Enter' ||
    key === 'Backspace' ||
    (key.length === 1 &&
      key.toUpperCase().charCodeAt() >= A_KEYCODE &&
      key.toUpperCase().charCodeAt() <= Z_KEYCODE)
  );
}

// Utility to conditionally concatenate classnames.
function clsx(...args) {
  return args.filter(Boolean).join(' ');
}

// Count the frequency of letters in a word.
function countLetterFreqInWord(word) {
  const freq = new Map();

  for (let i = 0; i < word.length; ++i) {
    if (!freq.has(word[i])) {
      freq.set(word[i], 0);
    }

    freq.set(word[i], freq.get(word[i]) + 1);
  }

  return freq;
}

function getInitialGridState(maxAttempts, lettersPerWord) {
  return Array.from({ length: maxAttempts }, () =>
    Array.from({ length: lettersPerWord }, () => ({
      char: '',
      state: LETTER_GUESS_STATE.INDETERMINATE,
    })),
  );
}

function getInitialLetterGuessState() {
  return {};
}

function Keyboard({ onPressKey, letterGuessState }) {
  return (
    <section className="keyboard-section">
      {KEYBOARD_LAYOUT.map((row, rowIndex) => {
        return (
          <div className="keyboard-row" key={rowIndex}>
            {row.map((char) => (
              <button
                key={char}
                onClick={() => {
                  onPressKey(char);
                }}
                className={clsx(
                  'keyboard-row__button',
                  GUESS_CLASSES[letterGuessState[char]],
                )}>
                {(() => {
                  switch (char) {
                    case 'Enter':
                      return 'ENTER';
                    case 'Backspace':
                      return 'DEL';
                    default:
                      return char;
                  }
                })()}
              </button>
            ))}
          </div>
        );
      })}
    </section>
  );
}

function LetterGrid({ letters }) {
  return (
    <section
      className="grid-section"
      style={{
        gridTemplateColumns: `repeat(${letters[0].length}, var(--size))`,
        gridTemplateRows: `repeat(${letters.length}, var(--size))`,
      }}>
      {letters.map((lettersRow, rowIndex) =>
        lettersRow.map(({ char, state }, colIndex) => (
          <div
            className={clsx(
              'grid-cell',
              Boolean(char) && 'grid-cell--filled',
              state !== LETTER_GUESS_STATE.INDETERMINATE &&
                clsx(
                  'grid-cell--final',
                  GUESS_CLASSES[state],
                ),
            )}
            style={{
              transitionDelay:
                state !== LETTER_GUESS_STATE.INDETERMINATE
                  ? `${colIndex * 50}ms`
                  : undefined,
            }}
            key={rowIndex + '-' + colIndex}>
            {char}
          </div>
        )),
      )}
    </section>
  );
}

function GameResult({
  gameState,
  wordOfTheDay,
  onResetClick,
}) {
  if (gameState === GAME_STATE.IN_PROGRESS) {
    return null;
  }

  return (
    <div className="result-row">
      <strong>
        <>
          {gameState === GAME_STATE.GUESSED_CORRECTLY &&
            'Congratulations 🎉'}
        </>
        <>
          {gameState === GAME_STATE.NO_MORE_GUESSES &&
            `Word: ${wordOfTheDay}`}
        </>
      </strong>
      <button
        type="button"
        className="reset-button"
        onClick={onResetClick}>
        Reset
      </button>
    </div>
  );
}

function generateRandomWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

const INITIAL_CURSOR_POSITION = [0, -1];

function Wordle({ maxAttempts, lettersPerWord }) {
  // Initialize word of the day.
  const [wordOfTheDay, setWordOfTheDay] = useState(
    generateRandomWord(),
  );
  // Represent overall game state.
  const [gameState, setGameState] = useState(
    GAME_STATE.IN_PROGRESS,
  );

  // User attempts and the states of each letter guess.
  const [gridState, setGridState] = useState(() =>
    getInitialGridState(maxAttempts, lettersPerWord),
  );
  // Current position in the grid.
  const [position, setPosition] = useState(
    INITIAL_CURSOR_POSITION,
  );
  // Tracks the state of letter guesses.
  const [letterGuessState, setLetterGuessState] = useState(
    () => getInitialLetterGuessState(),
  );

  useEffect(() => {
    // Print out word of the day in console for debugging purposes.
    console.log(
      `[DEBUG]: Word of the day is: ${wordOfTheDay}`,
    );
  }, [wordOfTheDay]);

  const resetGame = useCallback(() => {
    setWordOfTheDay(generateRandomWord());
    setGridState(
      getInitialGridState(maxAttempts, lettersPerWord),
    );
    setPosition(INITIAL_CURSOR_POSITION);
    setGameState(GAME_STATE.IN_PROGRESS);
    setLetterGuessState(getInitialLetterGuessState());
  }, [maxAttempts, lettersPerWord]);

  useEffect(() => {
    resetGame();
  }, [maxAttempts, lettersPerWord, resetGame]);

  function addLetter(char) {
    const [row, col] = position;

    // Row is already fully filled.
    if (col + 1 === lettersPerWord) {
      return;
    }

    // Clone the grid to avoid mutating the existing one.
    const newGridState = Array.from(gridState);
    newGridState[row][col + 1].char = char.toUpperCase();
    setPosition([row, col + 1]);
    setGridState(newGridState);
  }

  function deleteLetter() {
    const [row, col] = position;
    const newGridState = Array.from(gridState);

    if (col === -1) {
      return;
    }

    newGridState[row][col].char = '';
    setPosition([row, col - 1]);
    setGridState(newGridState);
  }

  function checkWord() {
    const [row, col] = position;

    // Not enough letters in the row yet.
    if (col + 1 < lettersPerWord) {
      return;
    }

    const newGridState = Array.from(gridState);
    const newLetterGuessState = { ...letterGuessState };
    const word = gridState[row]
      .map(({ char }) => char)
      .join('');
    // Create a map of count of letters in original word to compare
    // with the word entered by user.
    const letterFreq = countLetterFreqInWord(wordOfTheDay);
    const nonMatchingIndices = [];
    let matchCount = 0;

    // Update state for matching chars first.
    for (let i = 0; i < word.length; i++) {
      const currentChar = word[i];
      const currentActualChar = wordOfTheDay[i];

      if (currentChar === currentActualChar) {
        newGridState[row][i].state =
          LETTER_GUESS_STATE.CORRECT;
        newLetterGuessState[currentChar] =
          LETTER_GUESS_STATE.CORRECT;
        letterFreq.set(
          currentChar,
          letterFreq.get(currentChar) - 1,
        );
        matchCount++;
      } else {
        nonMatchingIndices.push(i);
      }
    }

    // Guessed correctly.
    if (matchCount === lettersPerWord) {
      setLetterGuessState(newLetterGuessState);
      setGridState(newGridState);
      setGameState(GAME_STATE.GUESSED_CORRECTLY);
      return;
    }

    // Update state for rest of the chars.
    nonMatchingIndices.forEach((idx) => {
      const char = word[idx];
      if (
        letterFreq.has(char) &&
        letterFreq.get(char) > 0
      ) {
        letterFreq.set(char, letterFreq.get(char) - 1);
        newGridState[row][idx].state =
          LETTER_GUESS_STATE.PRESENT;
        // Only change state if the new state is higher priority
        // than the current state.
        if (
          LETTER_GUESS_STATE_PRIORITY[
            LETTER_GUESS_STATE.PRESENT
          ] >
          LETTER_GUESS_STATE_PRIORITY[
            newLetterGuessState[char] ??
              LETTER_GUESS_STATE.INDETERMINATE
          ]
        ) {
          newLetterGuessState[char] =
            LETTER_GUESS_STATE.PRESENT;
        }
      } else {
        newGridState[row][idx].state =
          LETTER_GUESS_STATE.ABSENT;
        // Only change state if the new state is higher priority
        // than the current state.
        if (
          LETTER_GUESS_STATE_PRIORITY[
            LETTER_GUESS_STATE.ABSENT
          ] >
          LETTER_GUESS_STATE_PRIORITY[
            newLetterGuessState[char] ??
              LETTER_GUESS_STATE.INDETERMINATE
          ]
        ) {
          newLetterGuessState[char] =
            LETTER_GUESS_STATE.ABSENT;
        }
      }
    });

    setLetterGuessState(newLetterGuessState);
    setGridState(newGridState);

    // User did not manage to guess the correct answer.
    if (row + 1 === maxAttempts) {
      setGameState(GAME_STATE.NO_MORE_GUESSES);
      return;
    }

    // Move to next row.
    setPosition([row + 1, -1]);
  }

  function onPressKey(key) {
    // Game has a conclusion.
    if (gameState !== GAME_STATE.IN_PROGRESS) {
      return;
    }

    // Ignore invalid input from user.
    if (!isValidKey(key)) {
      return;
    }

    switch (key) {
      case 'Enter':
        checkWord();
        break;
      case 'Backspace':
        deleteLetter();
        break;
      default:
        addLetter(key);
    }
  }

  useEffect(() => {
    function onKeyDown(event) {
      // Only respond to single key presses.
      if (
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey
      ) {
        return;
      }

      // Ignore enter and space events not triggered on the page level
      // as there could be lower level elements handling them
      // and we don't want to double-handle them.
      if (
        event.target !== document.body &&
        (event.key === 'Enter' || event.key === ' ')
      ) {
        return;
      }

      onPressKey(event.key);
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  });

  return (
    <main className="root">
      <h1 className="title">Wordle</h1>
      <GameResult
        gameState={gameState}
        wordOfTheDay={wordOfTheDay}
        onResetClick={() => resetGame()}
      />
      <LetterGrid letters={gridState} />
      <Keyboard
        onPressKey={onPressKey}
        letterGuessState={letterGuessState}
      />
    </main>
  );
}

export default function App() {
  return <Wordle maxAttempts={6} lettersPerWord={5} />;
}
