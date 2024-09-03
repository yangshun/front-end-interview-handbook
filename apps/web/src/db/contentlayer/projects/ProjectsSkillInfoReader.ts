import type { ProjectsSkillInfo } from 'contentlayer/generated';

import { allProjectsSkillInfos } from '~/../.contentlayer/generated/ProjectsSkillInfo/_index.mjs';

export function fetchProjectsSkillInfo(slug: string, requestedLocale: string) {
  return allProjectsSkillInfos.find(
    (content) => content.slug === slug && content.locale === requestedLocale,
  ) as ProjectsSkillInfo | undefined;
}
