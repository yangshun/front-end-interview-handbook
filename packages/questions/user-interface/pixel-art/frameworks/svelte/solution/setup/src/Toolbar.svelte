<script>
  import { createEventDispatcher } from 'svelte';
  import { COLORS } from './colors';

  const dispatch = createEventDispatcher();

  export let mode;
  export let selectedColor;
</script>

<div class="toolbar">
  <div>
    <button
      on:click={() =>
        dispatch('set-mode', { mode: 'draw' })}
      class="toolbar__mode"
      class:toolbar__mode--selected={mode === 'draw'}>
      Draw
    </button>
    <button
      on:click={() =>
        dispatch('set-mode', { mode: 'erase' })}
      class="toolbar__mode"
      class:toolbar__mode--selected={mode === 'erase'}>
      Erase
    </button>
  </div>
  <div class="toolbar__color-picker">
    {#each Object.entries(COLORS) as [color, hex] (color)}
      <button
        aria-label={color}
        class="toolbar__color"
        class:toolbar__color--selected={color ===
          selectedColor}
        style:border-color={(() => {
          if (
            color !== selectedColor &&
            color === 'white'
          ) {
            return '#ccc';
          }

          if (
            color === selectedColor &&
            color === 'black'
          ) {
            return '#fff';
          }
        })()}
        style:background-color={hex}
        on:click={() => {
          dispatch('set-selected-color', {
            selectedColor: color,
          });
          dispatch('set-mode', { mode: 'draw' });
        }} />
    {/each}
  </div>
</div>

<style>
  .toolbar {
    display: flex;
    gap: 20px;
  }

  .toolbar .toolbar__mode {
    height: 36px;
    background-color: transparent;
    border: 2px solid black;
    font-size: 14px;
  }

  .toolbar .toolbar__mode--selected {
    background-color: black;
    color: white;
  }

  .toolbar .toolbar__color-picker {
    display: flex;
  }

  .toolbar .toolbar__color {
    --size: 20px;

    width: var(--size);
    height: var(--size);
    border: 2px solid transparent;
  }

  .toolbar .toolbar__color--selected {
    border: 2px solid black;
  }
</style>
