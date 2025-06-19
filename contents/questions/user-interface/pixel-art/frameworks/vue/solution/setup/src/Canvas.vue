<script setup lang="ts">
import { ref } from 'vue';
import { COLORS, Color, Mode } from './colors';
const props = defineProps<{
  mode: Mode;
  selectedColor: Color;
  initialRows: number;
  initialColumns: number;
}>();

const grid = ref<(Color | null)[][]>(
  Array.from({ length: props.initialRows }, () =>
    Array(props.initialColumns).fill(null),
  ),
);

const isDragging = ref(false);

function mark(rowIndex: number, cellIndex: number) {
  grid.value[rowIndex][cellIndex] =
    props.mode === 'erase' ? null : props.selectedColor;
}
</script>

<template>
  <div
    class="grid"
    @mousedown="isDragging = true"
    @mouseup="isDragging = false">
    <div
      v-for="(row, rowIndex) in grid"
      :class="[
        'grid__row',
        rowIndex % 2 === 0
          ? 'grid__row--even'
          : 'grid__row--odd',
      ]"
      :key="rowIndex">
      <button
        v-for="(cellColor, cellIndex) in row"
        :key="cellIndex"
        @click="mark(rowIndex, cellIndex)"
        @mousedown="mark(rowIndex, cellIndex)"
        @mouseenter="
          () => {
            if (isDragging) {
              mark(rowIndex, cellIndex);
            }
          }
        "
        :style="{
          'background-color':
            cellColor != null
              ? COLORS[cellColor]
              : undefined,
        }"
        class="grid__cell" />
    </div>
  </div>
</template>

<style>
.grid {
  display: flex;
  flex-direction: column;
}

.grid__row {
  display: flex;
  flex-shrink: 0;
}

.grid__cell {
  --cell-size: 20px;

  height: var(--cell-size);
  width: var(--cell-size);
  border: 0;
  flex-shrink: 0;
  background-color: transparent;
}

.grid__row--even .grid__cell:nth-child(odd),
.grid__row--odd .grid__cell:nth-child(even) {
  background-color: #e9ecef;
}
</style>
