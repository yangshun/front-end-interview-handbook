<script>
  import JobPosting from './JobPosting.svelte';
  const PAGE_SIZE = 6;
  let pageCount = 1;
  let jobIdsCache = null;

  async function fetchJobIds(currPage) {
    let jobs = jobIdsCache;
    if (!jobs) {
      const res = await fetch(
        'https://hacker-news.firebaseio.com/v0/jobstories.json',
      );
      jobIdsCache = jobs = await res.json();
    }
    const start = currPage * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return jobs.slice(start, end);
  }

  async function fetchJobs(currPage) {
    const jobIdsForPage = await fetchJobIds(currPage);
    const jobsForPage = await Promise.all(
      jobIdsForPage.map((jobId) =>
        fetch(
          `https://hacker-news.firebaseio.com/v0/item/${jobId}.json`,
        ).then((res) => res.json()),
      ),
    );
    return jobsForPage;
  }
</script>

<div class="app">
  <h1 class="title">Hacker News Jobs Board</h1>

  <div>
    <div class="jobs" role="list">
      {#each { length: pageCount } as _, page}
        {#await fetchJobs(page)}
          <p class="loading">Loading...</p>
        {:then jobs}
          {#each jobs as job}
            <JobPosting {...job} />
          {/each}
          {#if page === pageCount - 1 && jobs.length === PAGE_SIZE}
            <button
              class="load-more-button"
              on:click={() => pageCount++}>
              Load more jobs
            </button>
          {/if}
        {/await}
      {/each}
    </div>
  </div>
</div>

<style>
  .app {
    max-width: 600px;
    margin: 0 auto;
  }

  .title {
    font-size: 24px;
    font-weight: bold;
    color: #ff6600;
    margin-bottom: 24px;
  }

  .jobs {
    display: grid;
    row-gap: 16px;
  }
  .loading {
    color: #4d4d4d;
    font-weight: bold;
    font-size: 18px;
  }

  .load-more-button {
    background-color: #ff6600;
    border: none;
    border-radius: 4px;
    color: #fff;
    margin-top: 20px;
    padding: 8px 12px;
  }

  .load-more-button:not(:disabled) {
    cursor: pointer;
  }

  .load-more-button:hover {
    background-color: #e65c00;
  }
</style>
