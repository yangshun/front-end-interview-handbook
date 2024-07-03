<script setup>
import { LETTER_GUESS_STATE } from './constants';
const KEYBOARD_LAYOUT = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace'],
];

const props = defineProps({
  letterGuessState: Object,
});
</script>

<template>
  <section class="keyboard-section">
    <div
      v-for="(row, rowIndex) in KEYBOARD_LAYOUT"
      class="keyboard-row"
      :key="rowIndex">
      <button
        v-for="char in row"
        :key="char"
        @click="$emit('press-key', char)"
        class="keyboard-row__button"
        :class="{
          absent:
            letterGuessState[char] ===
            LETTER_GUESS_STATE.ABSENT,
          correct:
            letterGuessState[char] ===
            LETTER_GUESS_STATE.CORRECT,
          present:
            letterGuessState[char] ===
            LETTER_GUESS_STATE.PRESENT,
        }">
        {{
          (() => {
            switch (char) {
              case 'Enter':
                return 'ENTER';
              case 'Backspace':
                return 'DEL';
              default:
                return char;
            }
          })()
        }}
      </button>
    </div>
  </section>
</template>

<style>
.keyboard-section {
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
}

.keyboard-row {
  display: flex;
  justify-content: center;
}

.keyboard-row__button {
  --background-color: var(--indeterminate);
  --color: #000;

  border: none;
  background-color: var(--background-color);
  color: var(--color);
  height: 40px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  min-width: 30px;
  margin-inline: 0.25rem;
}

.absent {
  --background-color: var(--absent);
  --border-color: var(--absent);
  --color: #fff;
}

.correct {
  --background-color: var(--correct);
  --border-color: var(--correct);
  --color: #fff;
}

.present {
  --background-color: var(--present);
  --border-color: var(--present);
  --color: #fff;
}
</style>
