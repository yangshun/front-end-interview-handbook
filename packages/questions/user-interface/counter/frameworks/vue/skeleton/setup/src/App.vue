<script setup>
import { ref } from 'vue';

// This is a warm up question to help you
// get familiar with the editor.
// Most of the code has been filled in for you.
const count = ref(0);
</script>

<template>
  <!-- Fix the bug in the next line to 
    complete the question. -->
  <button @click="count--">Clicks: {{ count }}</button>
</template>
