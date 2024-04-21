import type {
  ProjectsTrackInfo,
  ProjectsTrackMetadata,
} from 'contentlayer/generated';

import type { ProjectsChallengeItem } from '../../challenges/types';

export type ProjectsTrackItem = Readonly<{
  challenges: ReadonlyArray<ProjectsChallengeItem>;
  info: ProjectsTrackInfo;
  metadata: ProjectsTrackMetadata;
  points: number;
}>;
