import type { ProjectsTrackInfo } from 'contentlayer/generated';

import { allProjectsTrackInfos } from '~/../.contentlayer/generated/ProjectsTrackInfo/_index.mjs';

export async function fetchAllProjectsTrackInfo() {
  return allProjectsTrackInfos as ReadonlyArray<ProjectsTrackInfo>;
}
