<script setup>
import MemoryGame from './MemoryGame.vue';
</script>

<template>
  <MemoryGame
    :rows="4"
    :cols="4"
    :delay="2000"
    :matchCount="2" />
</template>
