<script setup>
import { computed, ref, watch } from 'vue';

const props = defineProps({
  rows: Number,
  cols: Number,
  delay: Number,
  matchCount: Number,
});

const emojis = [
  '🐵',
  '🐶',
  '🦊',
  '🐱',
  '🦁',
  '🐯',
  '🐴',
  '🦄',
  '🦓',
  '🦌',
  '🐮',
  '🐷',
  '🐭',
  '🐹',
  '🐻',
  '🐨',
  '🐼',
  '🐽',
  '🐸',
  '🐰',
  '🐙',
];

function shuffle(array) {
  for (let i = 0; i < array.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Generate cards configuration with the required groups of emojis.
function generateCards(totalCount, matchCount) {
  const numGroups = totalCount / matchCount;
  if (numGroups > emojis.length) {
    throw new Error('Not enough emojis');
  }

  const emojisList = emojis.slice(0, numGroups);
  const cards = Array.from(
    { length: numGroups },
    () => null,
  )
    .map((_, idx) => idx)
    .map((idx) =>
      Array.from(
        { length: matchCount },
        () => emojisList[idx],
      ),
    )
    .flat();

  shuffle(cards);
  return cards;
}

// Total number of cells.
const totalCount = computed(() => props.rows * props.cols);
// An array of emojis to represent the cards.
const cards = ref([]);
// Currently flipped cards.
const flipped = ref([]);
// Identifier of matched cards.
const matched = ref(new Set());
// Delay before cards are flipped back.
let waitTimer = null;
// Whether the game has completed.
const gameCompleted = ref(false);

function resetGame() {
  waitTimer = null;
  cards.value = generateCards(
    totalCount.value,
    props.matchCount,
  );
  flipped.value.length = 0;
  matched.value.clear();
  gameCompleted.value = false;
}

function onFlip(index) {
  // Player flips more cards while there are
  // unmatched cards flipped open.
  if (waitTimer != null) {
    clearTimeout(waitTimer);
    waitTimer = null;
    flipped.value.length = 0;
  }

  flipped.value.push(index);

  // Not enough cards are flipped.
  if (flipped.value.length < props.matchCount) {
    return;
  }

  const allFlippedAreSame = flipped.value.every(
    (index) =>
      cards.value[flipped.value[0]] === cards.value[index],
  );

  if (allFlippedAreSame) {
    matched.value.add(cards.value[flipped.value[0]]);
    flipped.value.length = 0;

    if (
      matched.value.size * props.matchCount ===
      totalCount.value
    ) {
      gameCompleted.value = true;
    }

    return;
  }

  const timer = setTimeout(() => {
    // After a delay if no new cards were flipped,
    // flip all cards back.
    flipped.value.length = 0;
    waitTimer = null;
  }, props.delay);

  waitTimer = timer;
}

function checkDisabledCard(index) {
  return (
    matched.value.has(cards.value[index]) ||
    flipped.value.includes(index)
  );
}

watch(
  [
    () => props.cols,
    () => props.rows,
    () => props.matchCount,
  ],
  resetGame,
  {
    immediate: true,
  },
);
</script>

<template>
  <div class="app">
    <div
      class="grid"
      :style="{
        gridTemplateRows: `repeat(${rows}, var(--size))`,
        gridTemplateColumns: `repeat(${cols}, var(--size))`,
      }">
      <button
        v-for="(card, index) in cards"
        :key="index"
        :class="[
          'card',
          matched.has(cards[index]) && 'card--revealed',
        ]"
        :disabled="checkDisabledCard(index)"
        @click="onFlip(index)">
        {{ checkDisabledCard(index) ? card : '' }}
      </button>
    </div>

    <button v-if="gameCompleted" @click="resetGame">
      Play Again
    </button>
  </div>
</template>

<style>
.app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 10px;
}

.grid {
  --size: 60px;

  display: grid;
  gap: 8px;
  justify-content: center;
  border: 2px solid black;
  border-radius: 8px;
  padding: 8px;
}

.card {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid black;
  border-radius: 6px;
  font-size: 30px;
  cursor: pointer;
  background-color: #eee;
  overflow: hidden;
  position: relative;
}

.card:disabled {
  color: #000;
}

.card--revealed {
  background: transparent;
  border-color: transparent;
}
</style>
