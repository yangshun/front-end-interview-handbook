import type { ProjectMetadata } from 'contentlayer/generated';

import type { ProjectsSkill } from '../skills/types';

import type { Profile } from '@prisma/client';

export const projectDifficultyOptions = [
  'starter',
  'mid',
  'senior',
  'nightmare',
];

export type ProjectsProjectDifficulty =
  (typeof projectDifficultyOptions)[number];

export const projectAccessOptions = ['free', 'free-plus', 'premium'];
export type ProjectsProjectAccess = (typeof projectAccessOptions)[number];

export type ProjectsProjectStatus = 'completed' | 'in-progress' | 'not-started';

// TODO(projects): Remove in future.
export type ProjectsTrackMetadata = Readonly<{ name: string; slug: string }>;

export type ProjectsProjectItem = Readonly<{
  access: ProjectsProjectAccess;
  assetsHref: string;
  completedCount: number; // TODO(projects): Remove from metadata
  completedUsers: Array<Profile>; // TODO(projects): Remove from metadata
  completionHref: string;
  description: string;
  difficulty: ProjectsProjectDifficulty;
  href: string;
  imgSrc: string;
  // Metadata: ProjectMetadata;
  points: number;
  resourcesHref: string;
  skills: Array<ProjectsSkill>;
  slug: string;
  status: ProjectsProjectStatus;
  // TODO(projects): Remove from metadata
  submitHref: string;
  title: string;
  track: ProjectsTrackMetadata;
}>;
