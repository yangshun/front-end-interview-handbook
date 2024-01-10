import type {
  ProjectsChallengeMetadata,
  ProjectsTrackMetadata,
} from 'contentlayer/generated';

export type ProjectsTrack = Readonly<{
  completedProjectCount: number;
  isPremium: boolean;
  metadata: ProjectsTrackMetadata;
  points: number;
  projects: ReadonlyArray<ProjectsChallengeMetadata>;
}>;
