<script>
  import { onDestroy } from 'svelte';
  export let initialColor = 'green';
  export let config;
  export let layout = 'vertical';

  let timerId;
  let currentColor = initialColor;

  $: setTimer(currentColor);

  function setTimer(color) {
    const { duration, next } = config[color];
    timerId = setTimeout(() => {
      currentColor = next;
    }, duration);
  }

  onDestroy(() => {
    clearTimeout(timerId);
  });
</script>

<div
  aria-live="polite"
  aria-label={`Current light: ${currentColor}`}
  class="traffic-light-container"
  class:traffic-light-container--vertical={layout ===
    'vertical'}>
  {#each Object.keys(config) as color}
    <div
      aria-hidden={true}
      class="traffic-light"
      style:background-color={color === currentColor
        ? config[color].backgroundColor
        : undefined} />
  {/each}
</div>

<style>
  .traffic-light-container {
    background-color: #000;
    border-radius: 8px;
    display: flex;
    padding: 8px;
    gap: 8px;
    width: fit-content;
  }

  .traffic-light-container--vertical {
    flex-direction: column;
  }

  .traffic-light {
    --size: 50px;
    background-color: #555;
    border-radius: var(--size);
    height: var(--size);
    width: var(--size);
  }
</style>
