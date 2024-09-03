import type { ProjectsSkillMetadata } from 'contentlayer/generated';

import { allProjectsSkillMetadata } from '~/../.contentlayer/generated/ProjectsSkillMetadata/_index.mjs';

export function fetchProjectsSkillMetadata(slug: string) {
  return allProjectsSkillMetadata.find((content) => content.slug === slug) as
    | ProjectsSkillMetadata
    | undefined;
}
