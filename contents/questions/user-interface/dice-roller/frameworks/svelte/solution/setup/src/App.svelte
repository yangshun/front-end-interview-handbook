<script>
  import Dice from './Dice.svelte';

  const NUMBER_OF_FACES = 6;
  const MIN_NUMBER_OF_DICE = 1;
  const MAX_NUMBER_OF_DICE = 12;

  function getRandomRollDice(numberOfDice) {
    return Array.from({ length: numberOfDice }, () =>
      Math.floor(Math.random() * NUMBER_OF_FACES) + 1
    );
  }

  let rolledDice = [];
</script>

<div class="wrapper">
  <!-- To prevent a page reload. -->
  <form
    on:submit|preventDefault={(event) => {
      const data = new FormData(event.target);
      // Convert the input value to a number.
      const numberOfDice = +data.get('dice-count');
      rolledDice = getRandomRollDice(numberOfDice);
    }}
    class="dice-form">
    <div>
      <label for="dice-input">Number of dice</label>
      <input
        id="dice-input"
        name="dice-count"
        required
        type="number"
        min={MIN_NUMBER_OF_DICE}
        max={MAX_NUMBER_OF_DICE} />
    </div>
    <button type="submit">Roll</button>
  </form>

  {#if rolledDice.length > 0}
    <div class="dice-list" role="status" aria-live="polite">
      {#each rolledDice as value, index (index)}
        <Dice {value} />
      {/each}

      <!-- Announced by screen readers.-->
      <div class="sr-only">
        Roll results: {rolledDice.join(', ')}
      </div>
    </div>
  {/if}
</div>

<style>
  .wrapper {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 48px;
    padding-top: 16px;
  }

  .dice-form {
    display: flex;
    align-items: end;
    gap: 16px;
  }

  .dice-form label {
    display: block;
    font-size: 12px;
    margin-bottom: 8px;
  }

  .dice-form input {
    width: 100%;
  }

  .dice-list {
    background-color: #eaeaea;
    border-radius: 24px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    flex-wrap: wrap;
    padding: 16px;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
</style>
