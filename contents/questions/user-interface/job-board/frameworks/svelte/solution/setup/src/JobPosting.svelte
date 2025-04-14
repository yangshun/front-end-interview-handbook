<script>
  export let url;
  export let title;
  export let time;
  export let by;
</script>

<div class="post" role="listitem">
  <h2 class="post__title">
    {#if url}
      <a
        href={url}
        target="_blank"
        rel="noopener">
        {title}
      </a>
    {:else}
      {title}
    {/if}
  </h2>
  <p class="post__metadata">
    By {by} &middot; {new Date(
      time * 1000,
    ).toLocaleString()}
  </p>
</div>

<style>
  .post {
    background-color: #fff;
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    padding: 16px;
    display: grid;
    row-gap: 8px;
  }

  .post__title {
    font-size: 16px;
    font-weight: bold;
    margin-top: 0;
  }

  .post__metadata {
    font-size: 14px;
    color: #444;
  }
</style>
