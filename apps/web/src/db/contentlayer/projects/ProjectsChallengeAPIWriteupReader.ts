import type { ProjectsChallengeAPIWriteup } from 'contentlayer/generated';

import { allProjectsChallengeAPIWriteups } from '~/../.contentlayer/generated/ProjectsChallengeAPIWriteup/_index.mjs';

export async function fetchProjectsChallengeAPIWriteup(
  slug: string,
  requestedLocale: string,
) {
  return allProjectsChallengeAPIWriteups.find(
    (content) =>
      content.challenge === slug && content.locale === requestedLocale,
  ) as ProjectsChallengeAPIWriteup | undefined;
}
