import type { InterviewsCompanyGuide } from 'contentlayer/generated';

import { allInterviewsCompanyGuides } from '~/../.contentlayer/generated/InterviewsCompanyGuide/_index.mjs';

export async function fetchInterviewsCompanyGuide(slug: string) {
  return allInterviewsCompanyGuides.find((content) => content.slug === slug) as
    | InterviewsCompanyGuide
    | undefined;
}

export async function fetchInterviewsCompanyGuides() {
  return allInterviewsCompanyGuides as ReadonlyArray<InterviewsCompanyGuide>;
}
