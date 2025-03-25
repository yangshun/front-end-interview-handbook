<script>
  import HeartIcon from './HeartIcon.svelte';
  import SpinnerIcon from './SpinnerIcon.svelte';

  // Determines if the button is in the default/liked state.
  let liked = false;
  // Whether there's a pending background API request.
  let isPending = false;
  // Error message to be shown if the API request failed.
  let errorMessage = null;

  async function likeUnlikeAction() {
    try {
      isPending = true;
      errorMessage = null;

      const response = await fetch(
        'https://questions.greatfrontend.com/api/questions/like-button',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: liked ? 'unlike' : 'like',
          }),
        },
      );

      if (!response.ok) {
        const res = await response.json();
        errorMessage = res.message;
        return;
      }

      liked = !liked;
    } finally {
      isPending = false;
    }
  }
</script>

<div class="button-container">
  <button
    class="like-button {liked ? 'like-button--liked' : 'like-button--default'}"
    disabled={isPending}
    on:click={likeUnlikeAction}>
    {#if isPending}
      <SpinnerIcon />
    {:else}
      <HeartIcon />
    {/if}
    {liked ? 'Liked' : 'Like'}
  </button>
  {#if errorMessage}
    <div class="error-message">{errorMessage}</div>
  {/if}
</div>

<style>
  .error-message {
    font-size: 12px;
    margin-top: 8px;
  }

  .like-button {
    --default-color: #888;
    --active-color: red;

    align-items: center;
    border-style: solid;
    border-radius: 32px;
    border-width: 2px;
    display: flex;
    cursor: pointer;
    font-weight: bold;
    gap: 8px;
    height: 32px;
    padding: 4px 8px;
  }

  .like-button--default {
    background-color: #fff;
    border-color: var(--default-color);
    color: var(--default-color);
  }

  .like-button:hover {
    border-color: var(--active-color);
    color: var(--active-color);
  }

  .like-button--liked,
  .like-button--liked:hover {
    background-color: var(--active-color);
    border-color: var(--active-color);
    color: #fff;
  }
</style>
