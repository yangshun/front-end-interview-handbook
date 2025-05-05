<script>
  import './styles.css';
  const emojis = [
    '🐵',
    '🐶',
    '🦊',
    '🐱',
    '🦁',
    '🐯',
    '🐴',
    '🦄',
    '🦓',
    '🦌',
    '🐮',
    '🐷',
    '🐭',
    '🐹',
    '🐻',
    '🐨',
    '🐼',
    '🐽',
    '🐸',
    '🐰',
    '🐙',
  ];

  function shuffle(array) {
    for (let i = 0; i < array.length; i++) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Generate cards configuration with the required groups of emojis.
  function generateCards(totalCount, matchCount) {
    const numGroups = totalCount / matchCount;
    if (numGroups > emojis.length) {
      throw new Error('Not enough emojis');
    }

    const emojisList = emojis.slice(0, numGroups);
    const cards = Array.from(
      { length: numGroups },
      () => null,
    )
      .map((_, idx) => idx)
      .map((idx) =>
        Array.from(
          { length: matchCount },
          () => emojisList[idx],
        ),
      )
      .flat();

    shuffle(cards);
    return cards;
  }

  export let cols = 4;
  export let rows = 4;
  export let delay = 2000;
  export let matchCount = 2;

  // Total number of cells.
  $: totalCount = rows * cols;
  // An array of emojis to represent the cards.
  let cards = generateCards(totalCount, matchCount);
  // Currently flipped cards.
  let flipped = [];
  // Identifier of matched cards.
  let matched = new Set();
  // Delay before cards are flipped back.
  let waitTimer = null;
  // Whether the game has completed.
  let gameCompleted = false;

  function resetGame() {
    waitTimer = null;
    cards = generateCards(totalCount, matchCount);
    flipped = [];
    matched = new Set();
    gameCompleted = false;
  }

  $: if (matchCount < 2) {
    throw new Error(`${matchCount} should be 2 or more`);
  }
  $: if (totalCount % matchCount !== 0) {
    throw new Error(
      `Cannot divide total cells of ${totalCount} by ${matchCount}`,
    );
  }
  $: cols, rows, matchCount, resetGame();

  function onFlip(index) {
    let currFlipped = flipped;

    // Player flips more cards while there are
    // unmatched cards flipped open.
    if (waitTimer != null) {
      clearTimeout(waitTimer);
      waitTimer = null;
      currFlipped = [];
    }

    const newflipped = [...currFlipped, index];
    flipped = newflipped;

    // Not enough cards are flipped.
    if (newflipped.length < matchCount) {
      return;
    }

    const allFlippedAreSame = newflipped.every(
      (index) => cards[newflipped[0]] === cards[index],
    );

    if (allFlippedAreSame) {
      const newMatchedSet = new Set(matched);
      newMatchedSet.add(cards[newflipped[0]]);
      matched = newMatchedSet;
      flipped = [];

      if (newMatchedSet.size * matchCount === totalCount) {
        gameCompleted = true;
      }

      return;
    }

    const timer = setTimeout(() => {
      // After a delay if no new cards were flipped,
      // flip all cards back.
      flipped = [];
      waitTimer = null;
    }, delay);

    waitTimer = timer;
  }
</script>

<div class="app">
  <div
    class="grid"
    style="
      grid-template-rows: repeat({rows}, var(--size));
      grid-template-columns: repeat({cols}, var(--size));
    ">
    {#each cards as card, index}
      {@const isMatched = matched.has(cards[index])}
      {@const isFlipped = flipped.includes(index)}

      <button
        class="card"
        class:card--revealed={matched.has(cards[index])}
        disabled={isMatched || isFlipped}
        on:click={() => {
          onFlip(index);
        }}>
        {isMatched || isFlipped ? card : ''}
      </button>
    {/each}
  </div>
  {#if gameCompleted}
    <button on:click={resetGame}>Play Again</button>
  {/if}
</div>

<style>
  * {
    box-sizing: border-box;
  }

  .app {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 10px;
  }

  .grid {
    --size: 60px;

    display: grid;
    gap: 8px;
    justify-content: center;
    border: 2px solid black;
    border-radius: 8px;
    padding: 8px;
  }

  .card {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid black;
    border-radius: 6px;
    font-size: 30px;
    cursor: pointer;
    background-color: #eee;
    overflow: hidden;
    position: relative;
  }

  .card:disabled {
    color: #000;
  }

  .card--revealed {
    background: transparent;
    border-color: transparent;
  }
</style>
