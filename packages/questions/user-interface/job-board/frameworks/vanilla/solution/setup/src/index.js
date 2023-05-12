import './styles.css';

(() => {
  const PAGE_SIZE = 6;
  const $loadingEl = document.querySelector('.loading');
  const $jobListContainerEl = document.querySelector(
    '#job-list-container',
  );
  const $jobList = document.querySelector('.jobs');
  const $loadMoreButtonEl = document.querySelector(
    '.load-more-button',
  );
  let jobIds = null;
  let page = 0;

  async function fetchJobIds(currPage) {
    let jobs = jobIds;
    if (!jobs) {
      const res = await fetch(
        'https://hacker-news.firebaseio.com/v0/jobstories.json',
      );
      jobIds = await res.json();
    }

    const start = currPage * PAGE_SIZE;
    const end = start + PAGE_SIZE;

    return jobIds.slice(start, end);
  }

  async function fetchJobs(currPage) {
    const jobIdsForPage = await fetchJobIds(currPage);

    setFetchingJobDetails(true);
    const jobsForPage = await Promise.all(
      jobIdsForPage.map((jobId) =>
        fetch(
          `https://hacker-news.firebaseio.com/v0/item/${jobId}.json`,
        ).then((res) => res.json()),
      ),
    );
    appendJobs(jobsForPage);

    setFetchingJobDetails(false);

    $loadingEl.hidden = true;
    $jobListContainerEl.hidden = false;
  }

  function setFetchingJobDetails(fetching) {
    $loadMoreButtonEl.disabled = fetching;
    $loadMoreButtonEl.textContent = fetching
      ? 'Loading...'
      : 'Load more';
  }

  function appendJobs(jobs) {
    const $fragmentEl = document.createDocumentFragment();
    $fragmentEl.append(...jobs.map(createJobPostingEl));
    $jobList.append($fragmentEl);
  }

  function createJobPostingEl(job) {
    const $templateEl = document.getElementById(
      'job-posting-template',
    );
    const $post = $templateEl.content.cloneNode(true);

    if (job.url) {
      const $link = document.createElement('a');
      $link.href = job.url;
      $link.textContent = job.title;
      $post
        .querySelector('.post__title')
        .appendChild($link);
    } else {
      $post.querySelector('.post__title').textContent =
        job.title;
    }

    $post.querySelector('.post__author').textContent =
      job.by;
    $post.querySelector('.post__timestamp').textContent =
      new Date(job.time * 1000).toLocaleString();

    return $post;
  }

  $loadMoreButtonEl.addEventListener('click', () => {
    fetchJobs(++page);
  });

  fetchJobs(page);
})();
