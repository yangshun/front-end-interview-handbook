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

export const projectTrackOptions = [
  'design-system',
  'e-commerce',
  'games',
  'marketing',
  'portfolio',
];
export type ProjectsTrackEnum = (typeof projectTrackOptions)[number];

export type ProjectsProjectStatus = 'completed' | 'in-progress' | 'not-started';

export type ProjectsProjectItem = Readonly<{
  completedCount: number; // TODO(projects): Remove from metadata
  completedUsers: Array<Profile>; // TODO(projects): Remove from metadata
  metadata: ProjectMetadata &
    Readonly<{
      skills: ReadonlyArray<ProjectsSkill>;
    }>;
  status: ProjectsProjectStatus; // TODO(projects): Remove from metadata
}>;
