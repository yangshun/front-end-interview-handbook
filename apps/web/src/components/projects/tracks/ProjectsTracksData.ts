import type {
  ProjectsChallengeMetadata,
  ProjectsTrackMetadata,
} from 'contentlayer/generated';

export type ProjectsTrack = Readonly<{
  challenges: ReadonlyArray<ProjectsChallengeMetadata>;
  completedProjectCount: number;
  isPremium: boolean;
  metadata: ProjectsTrackMetadata;
  points: number;
}>;
