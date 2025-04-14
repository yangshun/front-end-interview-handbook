<script setup>
import { LETTER_GUESS_STATE } from './constants';

const props = defineProps({
  letters: Array,
});

function isIntermediateState(state) {
  return state === LETTER_GUESS_STATE.INDETERMINATE;
}
</script>

<template>
  <section
    class="grid-section"
    :style="{
      'grid-template-columns': `repeat(${props.letters[0].length}, var(--size))`,
      'grid-template-rows': `repeat(${props.letters.length}, var(--size))`,
    }">
    <template v-for="(letterRow, rowIndex) in letters">
      <button
        v-for="({ char, state }, colIndex) in letterRow"
        class="grid-cell"
        :key="`${rowIndex}-${colIndex}`"
        :class="{
          absent:
            !isIntermediateState(state) &&
            state === LETTER_GUESS_STATE.ABSENT,
          correct:
            !isIntermediateState(state) &&
            state === LETTER_GUESS_STATE.CORRECT,
          present:
            !isIntermediateState(state) &&
            state === LETTER_GUESS_STATE.PRESENT,
          'grid-cell--filled': Boolean(char),
          'grid-cell--final': !isIntermediateState(state),
        }"
        :style="{
          'transition-delay': !isIntermediateState(state)
            ? `${colIndex * 50}ms`
            : undefined,
        }">
        {{ char }}
      </button>
    </template>
  </section>
</template>

<style>
.grid-section {
  --size: 50px;

  display: grid;
  gap: 5px;
  justify-content: center;
}

.grid-cell {
  --fill-color: transparent;
  --background-color: #fff;
  --border-color: var(--indeterminate);
  --color: #000;

  border-color: var(--border-color);
  background-color: var(--background-color);
  border-width: 2px;
  border-style: solid;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.grid-cell--filled {
  animation: scale-on-fill 50ms ease-in;
}

@keyframes scale-on-fill {
  70% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.grid-cell--final {
  color: var(--color);
  transition-property: color background-color border-color;
  transition-duration: 50ms;
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
