import type { ProjectTrackMetadata } from 'contentlayer/generated';

type ProjectsTrackProject = Readonly<{
  href: string;
  slug: string;
  title: string;
}>;

export type ProjectsTrack = Readonly<{
  completedProjectCount: number;
  isPremium: boolean;
  metadata: ProjectTrackMetadata;
  points: number;
  projects: ReadonlyArray<ProjectsTrackProject>;
}>;
