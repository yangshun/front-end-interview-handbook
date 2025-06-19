<script setup>
import submitForm from './submitForm';
</script>

<template>
  <!-- Ignore the @submit event, it's used by GFE 
    to intercept the form submit event to 
    check your solution. -->
  <form @submit="submitForm">
    <input type="text" />
  </form>
</template>
