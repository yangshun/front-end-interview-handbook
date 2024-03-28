import type { ProjectsTrackMetadata } from 'contentlayer/generated';

import type { ProjectsChallengeItem } from '../../challenges/types';

export type ProjectsTrackItem = Readonly<{
  challenges: ReadonlyArray<ProjectsChallengeItem>;
  metadata: ProjectsTrackMetadata;
  points: number;
}>;
