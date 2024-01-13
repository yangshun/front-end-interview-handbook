import type { ProjectsChallengeMetadata } from 'contentlayer/generated';

export function filterProjectsChallengeSubmission<
  T extends ProjectsChallengeMetadata,
>(
  projects: ReadonlyArray<T>,
  filters: ReadonlyArray<(project: T) => boolean>,
): ReadonlyArray<T> {
  return projects.filter((project) =>
    filters.every((filter) => filter(project)),
  );
}
