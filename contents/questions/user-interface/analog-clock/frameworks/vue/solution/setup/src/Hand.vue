<script setup>
const props = defineProps({
  height: Number,
  width: Number,
  angle: Number,
});
</script>

<template>
  <div
    aria-hidden
    class="clock-hand"
    :style="{
      transform: `rotate(${props.angle}deg) scaleY(${props.height}) scaleX(${props.width})`,
    }" />
</template>

<style>
.clock-hand {
  background-color: #ccc;
  position: absolute;
  width: 1px;
  height: calc(var(--size) / 2);
  left: calc(var(--size) / 2);
  top: calc(var(--size) / 2);
  transform-origin: top center;
}
</style>
