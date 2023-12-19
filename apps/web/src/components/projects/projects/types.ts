import type { ProjectsSkill } from '../skills/types';

import type { User } from '@supabase/supabase-js';

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

export type ProjectsProjectMetadata = Readonly<{
  access: ProjectsProjectAccess;
  completedCount: number; // TODO(projects): Remove from metadata
  completedUsers: Array<User>; // TODO(projects): Remove from metadata
  description: string;
  difficulty: ProjectsProjectDifficulty;
  href: string;
  imgSrc: string;
  points: number;
  skills: Array<ProjectsSkill>;
  slug: string;
  status: ProjectsProjectStatus; // TODO(projects): Remove from metadata
  submitHref: string;
  title: string;
  trackName: string;
}>;
