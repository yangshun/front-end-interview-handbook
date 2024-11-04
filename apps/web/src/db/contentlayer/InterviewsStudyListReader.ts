import type { InterviewsStudyList } from 'contentlayer/generated';

import { allInterviewsStudyLists } from '~/../.contentlayer/generated/InterviewsStudyList/_index.mjs';

export async function fetchInterviewsStudyList(
  slug: string,
): Promise<InterviewsStudyList | undefined> {
  return (allInterviewsStudyLists as ReadonlyArray<InterviewsStudyList>).find(
    (content) => content.slug === slug,
  );
}

export async function fetchInterviewsStudyLists(
  categoryParam: InterviewsStudyList['category'],
): Promise<ReadonlyArray<InterviewsStudyList>> {
  return (allInterviewsStudyLists as ReadonlyArray<InterviewsStudyList>).filter(
    ({ category }) => categoryParam === category,
  );
}

export async function fetchInterviewsAllStudyLists() {
  const [focusAreas, studyPlans, companies] = await Promise.all([
    fetchInterviewsStudyLists('focus-area'),
    fetchInterviewsStudyLists('study-plan'),
    fetchInterviewsStudyLists('company'),
  ]);

  return { companies, focusAreas, studyPlans };
}
