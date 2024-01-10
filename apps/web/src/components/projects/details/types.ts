import type { ProjectsChallengeMetadata } from 'contentlayer/generated';

import type { ProjectsSkill } from '../skills/types';

import type { ProjectsChallengeSessionStatus } from '@prisma/client';

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

export type ProjectsProfileAvatarData = Readonly<{
  avatarUrl: string | null;
  id: string;
  name: string | null;
  username: string;
}>;
export type ProjectsProjectTrackPayload = Readonly<{
  href: string;
  slug: string;
  title: string;
}>;
export type ProjectsProjectItem = Readonly<{
  completedCount: number | null;
  completedProfiles: ReadonlyArray<ProjectsProfileAvatarData>;
  metadata: ProjectsChallengeMetadata &
    Readonly<{
      skills: ReadonlyArray<ProjectsSkill>;
    }>;
  status: ProjectsChallengeSessionStatus | null;
  track: ProjectsProjectTrackPayload;
}>;
