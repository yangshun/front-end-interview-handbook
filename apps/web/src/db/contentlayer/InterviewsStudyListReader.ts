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
