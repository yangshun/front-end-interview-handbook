import type { ProjectsChallengeStyleGuide } from 'contentlayer/generated';

import { allProjectsChallengeStyleGuides } from '~/../.contentlayer/generated/ProjectsChallengeStyleGuide/_index.mjs';

export async function fetchProjectsChallengeStyleGuide(
  slug: string,
  requestedLocale: string,
) {
  return allProjectsChallengeStyleGuides.find(
    (content) =>
      content.challenge === slug && content.locale === requestedLocale,
  ) as ProjectsChallengeStyleGuide | undefined;
}
