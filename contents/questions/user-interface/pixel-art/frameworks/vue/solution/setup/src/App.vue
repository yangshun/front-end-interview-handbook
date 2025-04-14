<script setup lang="ts">
import { ref } from 'vue';
import Canvas from './Canvas.vue';
import Toolbar from './Toolbar.vue';
import { Color, Mode } from './colors';

const mode = ref<Mode>('draw');
const selectedColor = ref<Color>('black');
</script>

<template>
  <div class="app">
    <Canvas
      :selectedColor="selectedColor"
      :mode="mode"
      :initialRows="15"
      :initialColumns="15" />
    <Toolbar
      v-model:selectedColor="selectedColor"
      v-model:mode="mode" />
  </div>
</template>

<style>
.app {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
