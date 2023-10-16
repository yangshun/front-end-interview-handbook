<script>
  export let index;
  export let disabled;
  export let mark;
  export let turn;

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<button
  aria-label={mark == null
    ? `Mark cell ${index} as ${turn}`
    : undefined}
  class="cell"
  {disabled}
  on:click={() => {
    dispatch('click');
  }}>
  <span aria-hidden={true}>{mark ?? ''}</span>
</button>

<style>
  .cell {
    background-color: #fff;
    border: 1px solid #ccc;
    color: #000;
    font-size: min(48px, 10vw);
    font-weight: bold;
    vertical-align: middle;
    aspect-ratio: 1 / 1;
  }

  .cell:not(:disabled) {
    cursor: pointer;
  }

  .cell:not(:disabled):hover {
    background-color: #fafafa;
  }
</style>
