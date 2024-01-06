import type {
  ProjectMetadata,
  ProjectTrackMetadata,
} from 'contentlayer/generated';

export type ProjectsTrack = Readonly<{
  completedProjectCount: number;
  isPremium: boolean;
  metadata: ProjectTrackMetadata;
  points: number;
  projects: ReadonlyArray<ProjectMetadata>;
}>;
