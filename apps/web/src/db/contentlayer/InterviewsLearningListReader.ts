import type { InterviewsLearningList } from 'contentlayer/generated';

import { allInterviewsLearningLists } from '~/../.contentlayer/generated/InterviewsLearningList/_index.mjs';

export async function fetchInterviewsLearningList(slug: string) {
  return allInterviewsLearningLists.find((content) => content.slug === slug) as
    | InterviewsLearningList
    | undefined;
}

export async function fetchInterviewsLearningLists(
  categoryParam: InterviewsLearningList['category'],
): Promise<ReadonlyArray<InterviewsLearningList>> {
  return (
    allInterviewsLearningLists as ReadonlyArray<InterviewsLearningList>
  ).filter(({ category }) => categoryParam === category);
}
