<script>
  import './styles.css';
  import LetterGrid from './LetterGrid.svelte';
  import Keyboard from './Keyboard.svelte';
  import { onMount } from 'svelte';
  import {
    LETTER_GUESS_STATE,
    LETTER_GUESS_STATE_PRIORITY,
    GAME_STATE,
  } from './constants';

  export let maxAttempts = 6;
  export let lettersPerWord = 5;

  const INITIAL_CURSOR_POSITION = [0, -1];

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

  function getInitialGridState(
    maxAttempts,
    lettersPerWord,
  ) {
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

  // Initialize word of the day.
  let wordOfTheDay = generateRandomWord();
  // Represent overall game state.
  let gameState = GAME_STATE.IN_PROGRESS;

  // User attempts and the states of each letter guess.
  let gridState = getInitialGridState(
    maxAttempts,
    lettersPerWord,
  );
  // Current position in the grid.
  let position = INITIAL_CURSOR_POSITION;
  // Tracks the state of letter guesses.
  let letterGuessState = getInitialLetterGuessState();

  $: console.log(
    `[DEBUG]: Word of the day is: ${wordOfTheDay}`,
  );
  $: maxAttempts, lettersPerWord, resetGame();

  function resetGame() {
    wordOfTheDay = generateRandomWord();
    gridState = getInitialGridState(
      maxAttempts,
      lettersPerWord,
    );
    position = INITIAL_CURSOR_POSITION;
    gameState = GAME_STATE.IN_PROGRESS;
    letterGuessState = getInitialLetterGuessState();
  }

  function addLetter(char) {
    const [row, col] = position;

    // Row is already fully filled.
    if (col + 1 === lettersPerWord) {
      return;
    }

    // Clone the grid to avoid mutating the existing one.
    const newGridState = Array.from(gridState);
    newGridState[row][col + 1].char = char.toUpperCase();
    position = [row, col + 1];
    gridState = newGridState;
  }

  function deleteLetter() {
    const [row, col] = position;
    const newGridState = Array.from(gridState);

    if (col === -1) {
      return;
    }

    newGridState[row][col].char = '';
    position = [row, col - 1];
    gridState = newGridState;
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
      letterGuessState = newLetterGuessState;
      gridState = newGridState;
      gameState = GAME_STATE.GUESSED_CORRECTLY;
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

    letterGuessState = newLetterGuessState;
    gridState = newGridState;

    // User did not manage to guess the correct answer.
    if (row + 1 === maxAttempts) {
      gameState = GAME_STATE.NO_MORE_GUESSES;
      return;
    }

    // Move to next row.
    position = [row + 1, -1];
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

  onMount(() => {
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

  function generateRandomWord() {
    return WORDS[Math.floor(Math.random() * WORDS.length)];
  }
</script>

<main class="root">
  <h1 class="title">Wordle</h1>
  {#if gameState !== GAME_STATE.IN_PROGRESS}
    <div class="result-row">
      <strong>
        {#if gameState === GAME_STATE.GUESSED_CORRECTLY}
          Congratulations 🎉
        {:else if gameState === GAME_STATE.NO_MORE_GUESSES}
          {`Word: ${wordOfTheDay}`}
        {/if}
      </strong>
      <button
        type="button"
        class="reset-button"
        on:click={resetGame}>
        Reset
      </button>
    </div>
  {/if}
  <LetterGrid letters={gridState} />
  <Keyboard
    on:press-key={(event) => onPressKey(event.detail.char)}
    {letterGuessState} />
</main>

<style>
  .root {
    display: grid;
    outline: none;
    row-gap: 16px;
  }

  .title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 0;
    text-align: center;
  }

  .result-row {
    display: flex;
    column-gap: 8px;
    justify-content: center;
  }

  .reset-button {
    cursor: pointer;
  }
</style>
