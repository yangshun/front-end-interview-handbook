import type { ProjectsChallengeMetadata } from 'contentlayer/generated';

import type { ProjectsSkillKey } from '../skills/types';
import type { ProjectsProfileAvatarDataSlim } from '../types';

import type { ProjectsChallengeSessionStatus } from '@prisma/client';

// Sorted in order of difficulty.
export const projectDifficultyOptions = [
  'starter',
  'mid',
  'senior',
  'nightmare',
];

export type ProjectsChallengeDifficulty =
  (typeof projectDifficultyOptions)[number];

export const projectAccessOptions = ['free', 'free-plus', 'premium'];
export type ProjectsChallengeAccess = (typeof projectAccessOptions)[number];

export const projectTrackOptions = [
  'apps',
  'design-system',
  'e-commerce',
  'games',
  'marketing',
  'portfolio',
];
export type ProjectsTrackEnum = (typeof projectTrackOptions)[number];

export type ProjectsChallengeTrackPayload = Readonly<{
  href: string;
  slug: string;
  title: string;
}>;

export type ProjectsChallengeItem = Readonly<{
  completedCount: number | null;
  completedProfiles: ReadonlyArray<ProjectsProfileAvatarDataSlim>;
  metadata: ProjectsChallengeMetadata &
    Readonly<{
      skills: ReadonlyArray<ProjectsSkillKey>;
    }>;
  status: ProjectsChallengeSessionStatus | null;
  track: ProjectsChallengeTrackPayload;
  userUnlocked: boolean | null;
}>;

export type ProjectsChallengeHistoricalStatuses = Record<
  ProjectsChallengeMetadata['slug'],
  { completedBefore: boolean; currentStatus: ProjectsChallengeSessionStatus }
>;

export type ProjectsChallengeSessionSkillsFormValues = Readonly<{
  roadmapSkills: Array<ProjectsSkillKey>;
  techStackSkills: Array<ProjectsSkillKey>;
}>;
