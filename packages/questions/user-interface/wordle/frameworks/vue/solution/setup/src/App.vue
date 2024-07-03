<script setup>
import {
  onMounted,
  onUnmounted,
  ref,
  watch,
  watchEffect,
} from 'vue';

import {
  GAME_STATE,
  LETTER_GUESS_STATE,
  LETTER_GUESS_STATE_PRIORITY,
} from './constants';
import Keyboard from './Keyboard.vue';
import LetterGrid from './LetterGrid.vue';

const WORDS = [
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
];

const A_KEYCODE = 65;
const Z_KEYCODE = 90;

const INITIAL_CURSOR_POSITION = [0, -1];

const props = defineProps({
  maxAttempts: {
    type: Number,
    default: 6,
  },
  lettersPerWord: {
    type: Number,
    default: 5,
  },
});

const wordOfTheDay = ref(generateRandomWord());
const gameState = ref(GAME_STATE.IN_PROGRESS);
const gridState = ref(
  getInitialGridState(
    props.maxAttempts,
    props.lettersPerWord,
  ),
);
const position = ref(INITIAL_CURSOR_POSITION.slice());
const letterGuessState = ref(getInitialLetterGuessState());

function resetGame() {
  wordOfTheDay.value = generateRandomWord();
  gridState.value = getInitialGridState(
    props.maxAttempts,
    props.lettersPerWord,
  );
  position.value = INITIAL_CURSOR_POSITION.slice();
  gameState.value = GAME_STATE.IN_PROGRESS;
  letterGuessState.value = getInitialLetterGuessState();
}

function addLetter(char) {
  const [row, col] = position.value;

  // Row is already fully filled.
  if (col + 1 === props.lettersPerWord) {
    return;
  }

  gridState.value[row][col + 1].char = char.toUpperCase();
  position.value = [row, col + 1];
}

function deleteLetter() {
  const [row, col] = position.value;

  if (col === -1) {
    return;
  }

  gridState.value[row][col].char = '';
  position.value = [row, col - 1];
}

function onPressKey(key) {
  // Game has a conclusion.
  if (gameState.value !== GAME_STATE.IN_PROGRESS) {
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

function isValidKey(key) {
  return (
    key === 'Enter' ||
    key === 'Backspace' ||
    (key.length === 1 &&
      key.toUpperCase().charCodeAt() >= A_KEYCODE &&
      key.toUpperCase().charCodeAt() <= Z_KEYCODE)
  );
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

function checkWord() {
  const [row, col] = position.value;

  // Not enough letters in the row yet.
  if (col + 1 < props.lettersPerWord) {
    return;
  }

  const word = gridState.value[row]
    .map(({ char }) => char)
    .join('');
  // Create a map of count of letters in original word to compare
  // with the word entered by user.
  const letterFreq = countLetterFreqInWord(
    wordOfTheDay.value,
  );
  const nonMatchingIndices = [];
  let matchCount = 0;

  // Update state for matching chars first.
  for (let i = 0; i < word.length; i++) {
    const currentChar = word[i];
    const currentActualChar = wordOfTheDay.value[i];

    if (currentChar === currentActualChar) {
      gridState.value[row][i].state =
        LETTER_GUESS_STATE.CORRECT;
      letterGuessState.value[currentChar] =
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
  if (matchCount === props.lettersPerWord) {
    gameState.value = GAME_STATE.GUESSED_CORRECTLY;
    return;
  }

  // Update state for rest of the chars.
  nonMatchingIndices.forEach((idx) => {
    const char = word[idx];
    if (letterFreq.has(char) && letterFreq.get(char) > 0) {
      letterFreq.set(char, letterFreq.get(char) - 1);
      gridState.value[row][idx].state =
        LETTER_GUESS_STATE.PRESENT;
      // Only change state if the new state is higher priority
      // than the current state.
      if (
        LETTER_GUESS_STATE_PRIORITY[
          LETTER_GUESS_STATE.PRESENT
        ] >
        LETTER_GUESS_STATE_PRIORITY[
          letterGuessState.value[char] ??
            LETTER_GUESS_STATE.INDETERMINATE
        ]
      ) {
        letterGuessState.value[char] =
          LETTER_GUESS_STATE.PRESENT;
      }
    } else {
      gridState.value[row][idx].state =
        LETTER_GUESS_STATE.ABSENT;
      // Only change state if the new state is higher priority
      // than the current state.
      if (
        LETTER_GUESS_STATE_PRIORITY[
          LETTER_GUESS_STATE.ABSENT
        ] >
        LETTER_GUESS_STATE_PRIORITY[
          letterGuessState.value[char] ??
            LETTER_GUESS_STATE.INDETERMINATE
        ]
      ) {
        letterGuessState.value[char] =
          LETTER_GUESS_STATE.ABSENT;
      }
    }
  });

  // User did not manage to guess the correct answer.
  if (row + 1 === props.maxAttempts) {
    gameState.value = GAME_STATE.NO_MORE_GUESSES;
    return;
  }

  // Move to next row.
  position.value = [row + 1, -1];
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

function generateRandomWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

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

onMounted(() => {
  document.addEventListener('keydown', onKeyDown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', onKeyDown);
});

watchEffect(() =>
  console.log(
    `[DEBUG]: Word of the day is: ${wordOfTheDay.value}`,
  ),
);

watch(
  [() => props.maxAttempts, () => props.lettersPerWord],
  () => {
    resetGame();
  },
);
</script>

<template>
  <main class="root">
    <h1 class="title">Wordle</h1>
    <div
      v-if="gameState !== GAME_STATE.IN_PROGRESS"
      class="result-row">
      <strong>
        {{
          gameState === GAME_STATE.GUESSED_CORRECTLY
            ? 'Congratulations 🎉'
            : gameState === GAME_STATE.NO_MORE_GUESSES
            ? `Word: ${wordOfTheDay}`
            : ''
        }}
      </strong>
      <button
        type="button"
        class="reset-button"
        @click="resetGame">
        Reset
      </button>
    </div>

    <LetterGrid :letters="gridState" />
    <Keyboard
      @press-key="onPressKey"
      :letterGuessState="letterGuessState" />
  </main>
</template>

<style>
body {
  --indeterminate: #d3d6da;
  --correct: #6aaa64;
  --present: #c9b458;
  --absent: #787c7e;

  margin: 0;
  font-family: 'Ubuntu', sans-serif;
}

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
