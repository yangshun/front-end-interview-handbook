<script setup>
import { ref } from 'vue';
import StarRating from './StarRating.vue';

const rating = ref(3);
</script>

<template>
  <div>
    <StarRating :max="5" v-model="rating" />
  </div>
</template>
