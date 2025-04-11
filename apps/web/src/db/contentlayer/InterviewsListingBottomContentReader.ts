import type { InterviewsListingBottomContent } from 'contentlayer/generated';

import { allInterviewsListingBottomContents } from '~/../.contentlayer/generated/InterviewsListingBottomContent/_index.mjs';

export async function fetchInterviewListingBottomContent(
  slug: string,
  locale = 'en-US',
): Promise<InterviewsListingBottomContent | undefined> {
  const bottomContent = (
    allInterviewsListingBottomContents as ReadonlyArray<InterviewsListingBottomContent>
  ).filter((content) => content.slug === slug);

  return (
    bottomContent.find((content) => content.locale === locale) ??
    bottomContent.find((content) => content.locale === 'en-US')!
  );
}
