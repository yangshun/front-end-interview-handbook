import type { ProjectsCommonGuide } from 'contentlayer/generated';

import { allProjectsCommonGuides } from '~/../.contentlayer/generated/ProjectsCommonGuide/_index.mjs';

export async function fetchAllProjectsCommonGuides() {
  return allProjectsCommonGuides as ReadonlyArray<ProjectsCommonGuide>;
}
