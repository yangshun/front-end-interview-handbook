import type { ProjectsChallengeMetadata } from 'contentlayer/generated';

import { allProjectsChallengeMetadata } from '~/../.contentlayer/generated/ProjectsChallengeMetadata/_index.mjs';

export async function fetchProjectsChallengeMetadata(slug: string) {
  return allProjectsChallengeMetadata.find(
    (content) => content.slug === slug,
  ) as ProjectsChallengeMetadata | undefined;
}

export async function fetchAllProjectsChallengeMetadata() {
  return allProjectsChallengeMetadata as Array<ProjectsChallengeMetadata>;
}

export function getAllProjectsChallengeMetadata() {
  return allProjectsChallengeMetadata as Array<ProjectsChallengeMetadata>;
}
