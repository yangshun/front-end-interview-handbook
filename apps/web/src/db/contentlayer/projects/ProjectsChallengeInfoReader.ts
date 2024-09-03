import type { ProjectsChallengeInfo } from 'contentlayer/generated';

import { allProjectsChallengeInfos } from '~/../.contentlayer/generated/ProjectsChallengeInfo/_index.mjs';

export async function fetchProjectsChallengeInfo(
  slug: string,
  requestedLocale: string,
) {
  return allProjectsChallengeInfos.find(
    (content) => content.slug === slug && content.locale === requestedLocale,
  ) as ProjectsChallengeInfo | undefined;
}

export async function fetchAllProjectsChallengeInfo() {
  return allProjectsChallengeInfos as Array<ProjectsChallengeInfo>;
}
