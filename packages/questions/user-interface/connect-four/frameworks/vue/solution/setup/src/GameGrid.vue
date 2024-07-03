<script setup>
import { COLS, PLAYER_TOKENS, ROWS } from './const';

const EMPTY_CELL = '#fff';

defineProps({
  grid: Array,
});
</script>

<template>
  <div
    class="grid"
    :style="{
      'grid-template-rows': `repeat(${ROWS}, var(--grid-item-size))`,
      'grid-template-columns': `repeat(${COLS}, var(--grid-item-size))`,
    }">
    <template v-for="row in grid">
      <div
        v-for="(cellValue, cellIndex) in row"
        :key="cellIndex"
        :style="{
          'background-color':
            cellValue != null
              ? PLAYER_TOKENS[cellValue]
              : EMPTY_CELL,
        }"
        class="grid-item" />
    </template>
  </div>
</template>

<style>
.grid {
  display: grid;
  grid-template-rows: repeat(6, var(--grid-item-size));
  grid-template-columns: repeat(7, var(--grid-item-size));
  background-color: #1c61f2;
  border-radius: 16px;
  padding: var(--grid-item-gap);
  gap: var(--grid-item-gap);
}

.grid-item {
  border-radius: 100%;
  transition: background-color 0.25s linear;
}
</style>
