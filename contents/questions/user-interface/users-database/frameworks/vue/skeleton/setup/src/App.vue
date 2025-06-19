<script setup>
import { reactive, ref } from 'vue';
const users = reactive([
  { first: 'Hans', last: 'Emil' },
  { first: 'Max', last: 'Mustermann' },
  { first: 'Roman', last: 'Tisch' },
]);
</script>

<template>
  <ul>
    <li v-for="user in users">
      {{ user.first }} {{ user.last }}
    </li>
  </ul>
</template>
