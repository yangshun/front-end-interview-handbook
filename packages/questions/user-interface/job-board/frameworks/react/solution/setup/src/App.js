import { useEffect, useRef, useState } from 'react';

import JobPosting from './JobPosting';

const PAGE_SIZE = 6;

export default function App() {
  const [fetchingJobDetails, setFetchingJobDetails] =
    useState(false);
  const [page, setPage] = useState(0);
  const [jobIds, setJobIds] = useState(null);
  const [jobs, setJobs] = useState([]);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    // Indicate that the component is unmounted, so
    // that requests that complete after the component
    // is unmounted don't cause a "setState on an unmounted
    // component error".
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    fetchJobs(page);
  }, [page]);

  async function fetchJobIds(currPage) {
    let jobs = jobIds;
    if (!jobs) {
      const res = await fetch(
        'https://hacker-news.firebaseio.com/v0/jobstories.json',
      );
      jobs = await res.json();

      // No-op if component is unmounted.
      if (!isMounted.current) {
        return;
      }

      setJobIds(jobs);
    }

    const start = currPage * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return jobs.slice(start, end);
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

    // No-op if component is unmounted.
    if (!isMounted.current) {
      return;
    }

    setFetchingJobDetails(false);
    // useEffect (and hence `fetchJobs`) runs twice on component mount
    // during development in Strict Mode.
    //
    // But since the value of `jobs` within the closure is the same,
    // the resulting combined jobs will be the same, assuming the results
    // for the API stays the same between requests.
    const combinedJobs = [...jobs, ...jobsForPage];
    setJobs(combinedJobs);
  }

  return (
    <div className="app">
      <h1 className="title">Hacker News Jobs Board</h1>
      {jobIds == null ? (
        <p className="loading">Loading...</p>
      ) : (
        <div>
          <div className="jobs" role="list">
            {jobs.map((job) => (
              <JobPosting key={job.id} {...job} />
            ))}
          </div>
          {jobs.length > 0 &&
            page * PAGE_SIZE + PAGE_SIZE <
              jobIds.length && (
              <button
                className="load-more-button"
                disabled={fetchingJobDetails}
                onClick={() => setPage(page + 1)}>
                {fetchingJobDetails
                  ? 'Loading...'
                  : 'Load more jobs'}
              </button>
            )}
        </div>
      )}
    </div>
  );
}
