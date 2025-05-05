<script>
  import './styles.css';

  // Make it easy to visualize the board.
  // Customize the board rendering just by changing
  // this 2D array. Note that all rows have to
  // contain the same number of elements in order
  // for the grid to render properly.
  const config = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];

  let order = [];
  let isDeactivating = false;

  // If necessary, disable clicking during deactivation is playing.
  function deactivateCells() {
    isDeactivating = true;
    const timer = setInterval(() => {
      // Remove the last item.
      order = order.slice(0, -1);

      if (order.length === 0) {
        clearInterval(timer);
        isDeactivating = false;
      }
    }, 300);
  }
</script>

<div class="wrapper">
  <div
    class="grid"
    style:grid-template-columns="repeat({config[0].length},
    1fr)">
    {#each config.flat(1) as value, index}
      {#if value}
        <button
          aria-label="Cell {index}"
          type="button"
          class="cell"
          class:cell--activated={/*
           Lookup efficiency can be improved by using
           a separate set/dict but that's overkill given
           the low number of cells.
          */
          order.includes(index)}
          on:click={() => {
            // Add index to order array.
            order = [...order, index];

            // All the cells have been activated, we can proceed
            // to deactivate them one by one.
            if (
              order.length ===
              config.flat(1).filter(Boolean).length
            ) {
              deactivateCells();
            }
          }}
          disabled={/* disabled prevents cells from responding to clicks. */
          order.includes(index) || isDeactivating} />
      {:else}
        <span />
      {/if}
    {/each}
  </div>
  <!-- Helper to show the state -->
  <pre>order array: {order.join(', ')}</pre>
</div>

<style>
  .wrapper {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 16px;
    justify-content: center;
  }

  .grid {
    --spacing: 20px;
    display: grid;
    max-width: 300px;
    width: 100%;
    padding: var(--spacing);
    gap: var(--spacing);
    border: 1px solid #000;
  }

  .cell {
    background-color: transparent;
    border: 1px solid #000;
    height: 0;
    /* Make height and width equal */
    padding-bottom: 100%;
  }

  .cell--activated {
    background-color: green;
  }
</style>
