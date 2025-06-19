<script>
  export let letters;
  import { LETTER_GUESS_STATE } from './constants';
</script>

<section
  class="grid-section"
  style="
    grid-template-columns: repeat({letters[0]
    .length}, var(--size));
    grid-template-rows: repeat({letters.length}, var(--size));
  ">
  {#each letters as lettersRow}
    {#each lettersRow as { char, state }, colIndex}
      {@const notIntermediateState =
        state !== LETTER_GUESS_STATE.INDETERMINATE}
      <div
        class="grid-cell"
        class:absent={notIntermediateState &&
          state === 'ABSENT'}
        class:correct={notIntermediateState &&
          state === 'CORRECT'}
        class:present={notIntermediateState &&
          state === 'PRESENT'}
        class:grid-cell--filled={Boolean(char)}
        class:grid-cell--final={notIntermediateState}
        style:transition-delay={notIntermediateState
          ? `${colIndex * 50}ms`
          : undefined}>
        {char}
      </div>
    {/each}
  {/each}
</section>

<style>
  .grid-section {
    --size: 50px;

    display: grid;
    gap: 5px;
    justify-content: center;
  }

  .grid-cell {
    --fill-color: transparent;
    --background-color: #fff;
    --border-color: var(--indeterminate);
    --color: #000;

    border-color: var(--border-color);
    background-color: var(--background-color);
    border-width: 2px;
    border-style: solid;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }

  .grid-cell--filled {
    animation: scale-on-fill 50ms ease-in;
  }

  @keyframes scale-on-fill {
    70% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  .grid-cell--final {
    color: var(--color);
    transition-property: color background-color border-color;
    transition-duration: 50ms;
  }

  .absent {
    --background-color: var(--absent);
    --border-color: var(--absent);
    --color: #fff;
  }

  .correct {
    --background-color: var(--correct);
    --border-color: var(--correct);
    --color: #fff;
  }

  .present {
    --background-color: var(--present);
    --border-color: var(--present);
    --color: #fff;
  }
</style>
