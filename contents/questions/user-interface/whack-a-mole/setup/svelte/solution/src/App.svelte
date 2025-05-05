<script>
  import { onDestroy } from 'svelte';

  export let rows = 3;
  export let cols = 3;
  export let roundDuration = 30;
  export let molesAtOnce = 1;
  export let molesAppearingInterval = 1500;

  $: totalCount = rows * cols;

  // Set of indices for currently visible moles.
  let visible = new Set();
  // Current player score.
  let score = null;
  // Whether the game is in progress.
  let running = false;
  // Time left for the current round.
  let timeLeft = roundDuration;
  let countdownTimerId = null;
  let moleTimerId = null;

  function startGame() {
    // Reset variables to default values.
    running = true;
    timeLeft = roundDuration;
    score = 0;
    visible = new Set();

    // Interval to decrement the timer to 0.
    countdownTimerId = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(countdownTimerId);
        stopGame();
        running = false;
        timeLeft = 0;
      } else {
        timeLeft--;
      }
    }, 1000);

    // Interval to generate moles.
    moleTimerId = setInterval(() => {
      visible = generateMolePositions(
        molesAtOnce,
        totalCount,
      );
    }, molesAppearingInterval);
  }

  function stopGame() {
    clearInterval(moleTimerId);
    visible = new Set();
  }

  onDestroy(() => {
    // Clear timers on unmount if it's running.
    clearInterval(countdownTimerId);
    stopGame();
  });

  function whackMole(index) {
    // Whacking on an empty cell, no-op.
    if (!visible.has(index)) {
      return;
    }

    visible.delete(index);
    visible = visible;
    score++;
  }

  // Fisher-Yates shuffle.
  function shuffle(array) {
    for (let i = 0; i < array.length; i++) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function generateMolePositions(molesAtOnce, totalCount) {
    // Generate an array containing values [0, totalCount].
    const indices = Array.from({ length: totalCount }).map(
      (_, index) => index,
    );
    shuffle(indices);
    // Take the first `totalCount` items
    // from the shuffled array.
    const shuffledIndices = indices.slice(0, molesAtOnce);

    return new Set(shuffledIndices);
  }
</script>

<div class="app">
  <div class="header">
    {#if score == null}
      <button
        class="start-button"
        type="button"
        on:click={startGame}>
        Start Game
      </button>
    {:else}
      <div class="round-information">
        <p>Score: {score}</p>
        {#if !running}
          <button
            class="start-button"
            type="button"
            on:click={startGame}>
            Play again
          </button>
        {/if}
        <p>Time Left: {timeLeft}</p>
      </div>
    {/if}
  </div>
  <div
    class="grid"
    style:grid-template-columns={`repeat(${cols}, 1fr)`}
    style:grid-template-rows={`repeat(${rows}, 1fr)`}>
    {#each { length: totalCount } as _, index}
      <button
        class="grid__cell"
        on:click={() => whackMole(index)}>
        <img
          src="https://www.greatfrontend.com/img/questions/whack-a-mole/mole-head.png"
          alt="Mole head"
          class="grid__cell-contents mole-head"
          class:mole-head--visible={visible.has(index)} />
        <img
          src="https://www.greatfrontend.com/img/questions/whack-a-mole/mole-hill.png"
          alt="Mole hill"
          class="grid__cell-contents mole-hill" />
      </button>
    {/each}
  </div>
</div>

<style>
  .app {
    box-sizing: border-box;
    padding-block: 16px;
    margin: 0 auto;
    max-width: 480px;
  }

  .header {
    display: flex;
    height: 30px;
    align-items: center;
    padding: 1rem 0;
    justify-content: center;
  }

  .round-information {
    align-items: center;
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
    font-weight: bold;
  }

  .start-button {
    background-color: #fff;
    border: none;
    border-radius: 4px;
    color: #000;
    cursor: pointer;
    font-weight: bold;
    padding: 0.5rem 1rem;
  }

  .grid {
    aspect-ratio: 1 / 1;
    display: grid;
    justify-content: center;
  }

  .grid__cell {
    border: none;
    background-color: var(--background-color);
    position: relative;
    overflow: hidden;
  }

  .grid__cell-contents {
    --width: 0;
    --height: 0;
    object-fit: contain;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: var(--width);
    height: var(--height);
    user-select: none;
  }

  .mole-hill {
    --width: 100%;
    --height: 30%;
    transform: translate(-50%, 10px);
  }

  .mole-head {
    --width: 100%;
    --height: 70%;

    transform: translate(-50%, 100%);
    transition: transform 0.1s ease-in;
    cursor: pointer;
  }

  .mole-head--visible {
    transform: translate(-50%, 0%);
  }
</style>
