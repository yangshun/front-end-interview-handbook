<script setup lang="ts">
import { COLORS, Color, Mode } from './colors';

const props = defineProps<{
  mode: Mode;
  selectedColor: Color;
}>();

const emit = defineEmits<{
  'update:mode': [value: Mode];
  'update:selectedColor': [value: Color];
}>();
</script>

<template>
  <div class="toolbar">
    <div>
      <button
        @click="() => $emit('update:mode', 'draw')"
        :class="[
          'toolbar__mode',
          mode === 'draw' && 'toolbar__mode--selected',
        ]">
        Draw
      </button>
      <button
        @click="() => $emit('update:mode', 'erase')"
        :class="[
          'toolbar__mode',
          mode === 'erase' && 'toolbar__mode--selected',
        ]">
        Erase
      </button>
    </div>
    <div class="toolbar__color-picker">
      <button
        v-for="[color, hex] in Object.entries(COLORS)"
        :key="color"
        :aria-label="color"
        :class="[
          'toolbar__color',
          color === selectedColor &&
            'toolbar__color--selected',
        ]"
        :style="{
          'border-color': (() => {
            if (
              color !== selectedColor &&
              color === 'white'
            ) {
              return '#ccc';
            }

            if (
              color === selectedColor &&
              color === 'black'
            ) {
              return '#fff';
            }
          })(),
          'background-color': hex,
        }"
        @click="
          () => {
            $emit('update:selectedColor', color);
            $emit('update:mode', 'draw');
          }
        " />
    </div>
  </div>
</template>

<style>
.toolbar {
  display: flex;
  gap: 20px;
}

.toolbar .toolbar__mode {
  height: 36px;
  background-color: transparent;
  border: 2px solid black;
  font-size: 14px;
}

.toolbar .toolbar__mode--selected {
  background-color: black;
  color: white;
}

.toolbar .toolbar__color-picker {
  display: flex;
}

.toolbar .toolbar__color {
  --size: 20px;

  width: var(--size);
  height: var(--size);
  border: 2px solid transparent;
}

.toolbar .toolbar__color--selected {
  border: 2px solid black;
}
</style>
