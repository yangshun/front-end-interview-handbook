import type { ProjectsChallengeAppendix } from 'contentlayer/generated';

import { allProjectsChallengeAppendixes } from '~/../.contentlayer/generated/ProjectsChallengeAppendix/_index.mjs';

export async function fetchProjectsChallengeAppendixes(
  slug: string,
  requestedLocale: string,
) {
  return allProjectsChallengeAppendixes.find(
    (content) =>
      content.challenge === slug && content.locale === requestedLocale,
  ) as ProjectsChallengeAppendix | undefined;
}
