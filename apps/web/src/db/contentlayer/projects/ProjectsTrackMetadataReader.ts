import type { ProjectsTrackMetadata } from 'contentlayer/generated';

import { allProjectsTrackMetadata } from '~/../.contentlayer/generated/ProjectsTrackMetadata/_index.mjs';

export async function fetchProjectsTrackMetadata(slug: string) {
  return allProjectsTrackMetadata.find((content) => content.slug === slug) as
    | ProjectsTrackMetadata
    | undefined;
}

export async function fetchAllProjectsTrackMetadata() {
  return allProjectsTrackMetadata as ReadonlyArray<ProjectsTrackMetadata>;
}
