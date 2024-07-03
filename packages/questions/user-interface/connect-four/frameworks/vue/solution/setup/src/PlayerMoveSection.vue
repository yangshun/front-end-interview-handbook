<script setup>
import { COLS, PLAYER_TOKENS } from './const';

defineProps({
  availableColumns: Set,
  currentColumn: Number,
  currentPlayer: Number,
  gameHasEnded: Boolean,
});
</script>

<template>
  <div class="player-move-section">
    <button
      v-for="(_, index) in COLS"
      :key="index"
      :aria-label="`Column ${index + 1}`"
      :disabled="
        !availableColumns.has(index) || gameHasEnded
      "
      :style="{
        'background-color':
          currentColumn === index && !gameHasEnded
            ? PLAYER_TOKENS[currentPlayer]
            : undefined,
      }"
      class="player-move-column"
      @mouseenter="$emit('column-hover', index)"
      @click="$emit('player-move', index)" />
  </div>
</template>

<style>
.player-move-section {
  display: flex;
  align-items: center;
  padding: var(--grid-item-gap);
  gap: var(--grid-item-gap);
}

.player-move-column {
  background-color: transparent;
  height: var(--grid-item-size);
  width: var(--grid-item-size);
  border-radius: 100%;
  transition: background-color 0.1s linear;
  outline: none;
  border: none;
  cursor: pointer;
}
</style>
