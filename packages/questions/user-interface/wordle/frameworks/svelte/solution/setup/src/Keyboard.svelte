<script>
  import { createEventDispatcher } from 'svelte';
  const KEYBOARD_LAYOUT = Object.freeze([
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    [
      'Enter',
      'Z',
      'X',
      'C',
      'V',
      'B',
      'N',
      'M',
      'Backspace',
    ],
  ]);

  export let letterGuessState;
  const dispatch = createEventDispatcher();
</script>

<section class="keyboard-section">
  {#each KEYBOARD_LAYOUT as row, rowIndex (rowIndex)}
    <div class="keyboard-row">
      {#each row as char (char)}
        <button
          on:click={() => {
            dispatch('press-key', { char });
          }}
          class="keyboard-row__button"
          class:absent={letterGuessState[char] === 'ABSENT'}
          class:correct={letterGuessState[char] ===
            'CORRECT'}
          class:present={letterGuessState[char] ===
            'PRESENT'}>
          {(() => {
            switch (char) {
              case 'Enter':
                return 'ENTER';
              case 'Backspace':
                return 'DEL';
              default:
                return char;
            }
          })()}
        </button>
      {/each}
    </div>
  {/each}
</section>

<style>
  .keyboard-section {
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
  }

  .keyboard-row {
    display: flex;
    justify-content: center;
  }

  .keyboard-row__button {
    --background-color: var(--indeterminate);
    --color: #000;

    border: none;
    background-color: var(--background-color);
    color: var(--color);
    height: 40px;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
    min-width: 30px;
    margin-inline: 0.25rem;
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
