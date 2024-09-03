import type { ProjectsChallengeGuide } from 'contentlayer/generated';

import { allProjectsChallengeGuides } from '~/../.contentlayer/generated/ProjectsChallengeGuide/_index.mjs';

export async function fetchProjectsChallengeGuide(
  slug: string,
  requestedLocale: string,
) {
  return allProjectsChallengeGuides.find(
    (content) =>
      content.challenge === slug && content.locale === requestedLocale,
  ) as ProjectsChallengeGuide | undefined;
}
