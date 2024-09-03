import type { ProjectsChallengeBrief } from 'contentlayer/generated';

import { allProjectsChallengeBriefs } from '~/../.contentlayer/generated/ProjectsChallengeBrief/_index.mjs';

export async function fetchProjectsChallengeBrief(slug: string) {
  return allProjectsChallengeBriefs.find((content) => content.slug === slug) as
    | ProjectsChallengeBrief
    | undefined;
}
