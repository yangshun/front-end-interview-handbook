<script>
  import { createEventDispatcher } from 'svelte';
  import { COLS, PLAYER_TOKENS } from './const';
  export let availableColumns;
  export let currentColumn;
  export let currentPlayer;
  export let gameHasEnded;

  const dispatch = createEventDispatcher();
</script>

<div class="player-move-section">
  {#each { length: COLS } as _, index (index)}
    <button
      aria-label={`Column ${index + 1}`}
      disabled={!availableColumns.has(index) ||
        gameHasEnded}
      style:background-color={currentColumn === index &&
      !gameHasEnded
        ? PLAYER_TOKENS[currentPlayer]
        : undefined}
      class="player-move-column"
      on:mouseenter={() =>
        dispatch('column-hover', { index })}
      on:click={() => dispatch('player-move', { index })} />
  {/each}
</div>

<style>
  .player-move-section {
    display: flex;
    align-items: center;
    padding: var(--grid-item-gap);
    gap: var(--grid-item-gap);
  }

  .player-move-column {
    background-color: transparent;
    height: var(--grid-item-size);
    width: var(--grid-item-size);
    border-radius: 100%;
    transition: background-color 0.1s linear;
    outline: none;
    border: none;
    cursor: pointer;
  }
</style>
