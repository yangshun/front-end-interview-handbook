import type { ProjectsChallengeMetadata } from 'contentlayer/generated';
import Fuse from 'fuse.js';

export async function projectsChallengeFindClosestToSlug(
  challenges: ReadonlyArray<ProjectsChallengeMetadata>,
  querySlug: string,
) {
  const challengeSlugs = challenges.map((challenge) => ({
    ...challenge,
    searchable: challenge.slug.replace(/-/g, ' '),
  }));

  const fuse = new Fuse(challengeSlugs, {
    keys: ['searchable'],
    threshold: 0.5,
  });

  const query = querySlug.replace(/-/g, ' ');
  const matches = fuse.search(query);

  return matches.length === 0 ? null : matches[0].item;
}
