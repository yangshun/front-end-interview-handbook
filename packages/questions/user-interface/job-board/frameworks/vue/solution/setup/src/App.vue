<script setup>
import { ref, watch } from 'vue';
import JobPosting from './JobPosting.vue';

const PAGE_SIZE = 6;

const fetchingJobDetails = ref(false);
const jobIds = ref(null);
const jobs = ref([]);
const page = ref(0);

watch(
  page,
  (currPage) => {
    fetchJobs(currPage);
  },
  {
    immediate: true,
  },
);

async function fetchJobIds(currPage) {
  if (!jobIds.value) {
    const res = await fetch(
      'https://hacker-news.firebaseio.com/v0/jobstories.json',
    );
    jobIds.value = await res.json();
  }

  const start = currPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  return jobIds.value.slice(start, end);
}

async function fetchJobs(currPage) {
  const jobIdsForPage = await fetchJobIds(currPage);

  fetchingJobDetails.value = true;
  const jobsForPage = await Promise.all(
    jobIdsForPage.map((jobId) =>
      fetch(
        `https://hacker-news.firebaseio.com/v0/item/${jobId}.json`,
      ).then((res) => res.json()),
    ),
  );
  jobs.value.push(...jobsForPage);

  fetchingJobDetails.value = false;
}
</script>

<template>
  <div class="app">
    <h1 class="title">Hacker News Jobs Board</h1>
    <p class="loading" v-if="jobIds == null">Loading...</p>
    <div v-else>
      <div class="jobs" role="list">
        <JobPosting
          v-for="job in jobs"
          :key="job.id"
          v-bind="job" />
      </div>

      <button
        class="load-more-button"
        :disabled="fetchingJobDetails"
        @click="page++"
        v-if="
          jobs.length > 0 &&
          page * PAGE_SIZE + PAGE_SIZE < jobIds.length
        ">
        {{
          fetchingJobDetails
            ? 'Loading...'
            : 'Load more jobs'
        }}
      </button>
    </div>
  </div>
</template>

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
