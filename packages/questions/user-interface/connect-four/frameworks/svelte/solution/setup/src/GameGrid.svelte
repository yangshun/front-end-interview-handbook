<script>
  import { COLS, PLAYER_TOKENS, ROWS } from './const';

  const EMPTY_CELL = '#fff';

  export let grid;
</script>

<div
  class="grid"
  style:grid-template-rows={`repeat(${ROWS}, var(--grid-item-size))`}
  style:grid-template-columns={`repeat(${COLS}, var(--grid-item-size))`}>
  {#each grid as rows, rowIndex (rowIndex)}
    {#each rows as cellValue, colIndex (colIndex)}
      <div
        style:background-color={cellValue != null
          ? PLAYER_TOKENS[cellValue]
          : EMPTY_CELL}
        class="grid-item" />
    {/each}
  {/each}
</div>

<style>
  .grid {
    display: grid;
    grid-template-rows: repeat(6, var(--grid-item-size));
    grid-template-columns: repeat(7, var(--grid-item-size));
    background-color: #1c61f2;
    border-radius: 16px;
    padding: var(--grid-item-gap);
    gap: var(--grid-item-gap);
  }

  .grid-item {
    border-radius: 100%;
    transition: background-color 0.25s linear;
  }
</style>
