import type { JobsPosting } from 'contentlayer/generated';

import { allJobsPostings } from '~/../.contentlayer/generated/JobsPosting/_index.mjs';

export async function fetchJobPosting(slug: string) {
  return allJobsPostings.find((content) => content.slug === slug) as
    | JobsPosting
    | undefined;
}

export async function fetchJobPostings() {
  return allJobsPostings as ReadonlyArray<JobsPosting>;
}
