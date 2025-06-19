<script setup>
import { PLAYER_TOKENS } from './const';

defineProps({
  winner: String,
});
</script>

<template>
  <div
    class="winner-token"
    :style="{ 'background-color': PLAYER_TOKENS[winner] }">
    WON
  </div>
</template>

<style>
.winner-token {
  height: var(--grid-item-size);
  width: var(--grid-item-size);
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: 600;
}
</style>
