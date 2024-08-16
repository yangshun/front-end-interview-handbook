<script setup>
import { computed, onUnmounted, ref } from 'vue';
const props = defineProps({
  rows: {
    type: Number,
    default: 3,
  },
  cols: {
    type: Number,
    default: 3,
  },
  roundDuration: {
    type: Number,
    default: 30,
  },
  molesAtOnce: {
    type: Number,
    default: 1,
  },
  molesAppearingInterval: {
    type: Number,
    default: 1500,
  },
});

const totalCount = computed(() => props.rows * props.cols);

const visible = ref(new Set());
const score = ref(null);
const running = ref(false);
const timeLeft = ref(0);
let countdownTimerId = null;
let moleTimerId = null;

function startGame() {
  // Reset variables to default values.
  running.value = true;
  timeLeft.value = props.roundDuration;
  score.value = 0;
  visible.value.clear();

  // Interval to decrement the timer to 0.
  countdownTimerId = setInterval(() => {
    if (timeLeft.value <= 0) {
      clearInterval(countdownTimerId);
      stopGame();
      running.value = false;
      timeLeft.value = 0;
    } else {
      timeLeft.value--;
    }
  }, 1000);

  // Interval to generate moles.
  moleTimerId = setInterval(() => {
    visible.value = generateMolePositions(
      props.molesAtOnce,
      totalCount.value,
    );
  }, props.molesAppearingInterval);
}

function stopGame() {
  clearInterval(moleTimerId);
  visible.value.clear();
}

onUnmounted(() => {
  // Clear timers on unmount if it's running.
  clearInterval(countdownTimerId);
  stopGame();
});

function whackMole(index) {
  // Whacking on an empty cell, no-op.
  if (!visible.value.has(index)) {
    return;
  }

  visible.value.delete(index);
  score.value++;
}

// Fisher-Yates shuffle.
function shuffle(array) {
  for (let i = 0; i < array.length; i++) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function generateMolePositions(molesAtOnce, totalCount) {
  // Generate an array containing values [0, totalCount].
  const indices = Array.from({ length: totalCount }).map(
    (_, index) => index,
  );
  shuffle(indices);
  // Take the first `totalCount` items
  // from the shuffled array.
  const shuffledIndices = indices.slice(0, molesAtOnce);

  return new Set(shuffledIndices);
}
</script>

<template>
  <div class="app">
    <div class="header">
      <button
        v-if="score == null"
        class="start-button"
        type="button"
        @click="startGame">
        Start Game
      </button>
      <div v-else class="round-information">
        <p>Score: {{ score }}</p>
        <button
          v-if="!running"
          class="start-button"
          type="button"
          @click="startGame">
          Play again
        </button>
        <p>Time Left: {{ timeLeft }}</p>
      </div>
    </div>

    <div
      class="grid"
      :style="{
        'grid-template-columns': `repeat(${props.cols}, 1fr)`,
        'grid-template-rows': `repeat(${props.rows}, 1fr)`,
      }">
      <button
        v-for="(_, index) in totalCount"
        :key="index"
        class="grid__cell"
        @click="whackMole(index)">
        <img
          src="https://www.greatfrontend.com/img/questions/whack-a-mole/mole-head.png"
          alt="Mole head"
          :class="[
            'grid__cell-contents mole-head',
            visible.has(index) && 'mole-head--visible',
          ]" />

        <img
          src="https://www.greatfrontend.com/img/questions/whack-a-mole/mole-hill.png"
          alt="Mole hill"
          class="grid__cell-contents mole-hill" />
      </button>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}

body {
  --background-color: salmon;

  background-color: var(--background-color);
  font-family: sans-serif;
  padding: 2rem;
}

.app {
  box-sizing: border-box;
  padding-block: 16px;
  margin: 0 auto;
  max-width: 480px;
}

.header {
  display: flex;
  height: 30px;
  align-items: center;
  padding: 1rem 0;
  justify-content: center;
}

.round-information {
  align-items: center;
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  font-weight: bold;
}

.start-button {
  background-color: #fff;
  border: none;
  border-radius: 4px;
  color: #000;
  cursor: pointer;
  font-weight: bold;
  padding: 0.5rem 1rem;
}

.grid {
  aspect-ratio: 1 / 1;
  display: grid;
  justify-content: center;
}

.grid__cell {
  border: none;
  background-color: var(--background-color);
  position: relative;
  overflow: hidden;
}

.grid__cell-contents {
  --width: 0;
  --height: 0;
  object-fit: contain;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: var(--width);
  height: var(--height);
  user-select: none;
}

.mole-hill {
  --width: 100%;
  --height: 30%;
  transform: translate(-50%, 10px);
}

.mole-head {
  --width: 100%;
  --height: 70%;

  transform: translate(-50%, 100%);
  transition: transform 0.1s ease-in;
  cursor: pointer;
}

.mole-head--visible {
  transform: translate(-50%, 0%);
}
</style>
