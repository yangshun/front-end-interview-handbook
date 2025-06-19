import type { InterviewsListingBottomContent } from 'contentlayer/generated';

import { allInterviewsListingBottomContents } from '~/../.contentlayer/generated/InterviewsListingBottomContent/_index.mjs';

export async function fetchInterviewListingBottomContent(slug: string) {
  return allInterviewsListingBottomContents.find(
    (content) => content.slug === slug,
  ) as InterviewsListingBottomContent | undefined;
}
