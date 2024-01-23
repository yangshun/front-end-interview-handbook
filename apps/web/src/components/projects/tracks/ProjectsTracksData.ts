import type {
  ProjectsChallengeMetadata,
  ProjectsTrackMetadata,
} from 'contentlayer/generated';

export type ProjectsTrackItem = Readonly<{
  challenges: ReadonlyArray<ProjectsChallengeMetadata>;
  metadata: ProjectsTrackMetadata;
  points: number;
}>;
