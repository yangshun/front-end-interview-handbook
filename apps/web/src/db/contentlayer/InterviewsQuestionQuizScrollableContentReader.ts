import type { InterviewsQuestionQuizScrollableContent } from 'contentlayer/generated';

import { allInterviewsQuestionQuizScrollableContents } from '~/../.contentlayer/generated/InterviewsQuestionQuizScrollableContent/_index.mjs';

export async function fetchInterviewsQuestionQuizScrollScrollableContent(
  slug: string,
  locale: string,
): Promise<InterviewsQuestionQuizScrollableContent | undefined> {
  const studyLists = (
    allInterviewsQuestionQuizScrollableContents as ReadonlyArray<InterviewsQuestionQuizScrollableContent>
  ).filter((content) => content.slug === slug);

  return (
    studyLists.find((content) => content.locale === locale) ??
    studyLists.find((content) => content.locale === 'en-US')!
  );
}
