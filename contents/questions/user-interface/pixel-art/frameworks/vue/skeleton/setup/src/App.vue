<script setup>
import { ref } from 'vue';

const COLORS = {
  white: '#fff',
  gray: '#e9ecef',
  black: '#000',
  red: '#cc0001',
  orange: '#fb940b',
  yellow: '#ffff01',
  green: '#01cc00',
  teal: '#38d9a9',
  blue: '#228be6',
  purple: '#7950f2',
  beige: '#ff8787',
};

const message = ref('Hello World!');
</script>

<template>
  <div>
    {{ message }}
    <ul>
      <li
        v-for="[color, hex] in Object.entries(COLORS)"
        :key="color">
        <span :style="{ color: hex }">{{ color }}</span>
      </li>
    </ul>
  </div>
</template>
