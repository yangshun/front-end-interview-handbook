import type {
  ProjectsChallengeInfo,
  ProjectsChallengeMetadata,
} from 'contentlayer/generated';

import type { ProjectsSkillKey } from '../skills/types';
import type { ProjectsDeviceImages } from '../types';

import type {
  SandboxEnvironment,
  SandpackFiles,
} from '@codesandbox/sandpack-react';
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

export const projectChallengeResourceOptions = [
  'api',
  'design-files',
  'image-assets',
  'readme',
  'starter-code',
  'style-guide',
];

export type ProjectsChallengeResource =
  (typeof projectChallengeResourceOptions)[number];

export const projectAccessOptions = ['free', 'standard', 'premium'];
export type ProjectsChallengeAccess = (typeof projectAccessOptions)[number];

export type ProjectsChallengeVariantPageImages = Readonly<{
  images: ProjectsDeviceImages;
  label: string;
}>;
export type ProjectsChallengeVariantImages =
  ReadonlyArray<ProjectsChallengeVariantPageImages>;

export const projectTrackOptions = [
  'apps',
  'design-system',
  'e-commerce',
  'games',
  'marketing',
  'portfolio',
];
export type ProjectsTrackType =
  | 'apps'
  | 'design-system'
  | 'e-commerce'
  | 'marketing';
export type ProjectsTrackEnum = (typeof projectTrackOptions)[number];
export type ProjectsChallengeTrackPayload = Readonly<{
  href: string;
  slug: string;
  title: string;
}>;

export type ProjectsChallengeItem = Readonly<{
  info: ProjectsChallengeInfo;
  metadata: ProjectsChallengeMetadata;
  startedCount: number | null;
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

export type ProjectsChallengeSolutionFrameworkType = 'react' | 'vanilla';

export type ProjectsChallengeSolutionWorkspace = Readonly<{
  activeFile?: string;
  environment: SandboxEnvironment;
  externalResources?: Array<string>;
  visibleFiles?: Array<string>;
}>;

export type ProjectsChallengeSolutionBundle = Readonly<{
  files: SandpackFiles;
  workspace: ProjectsChallengeSolutionWorkspace;
}>;

export const projectsChallengeSupportedSolutionFrameworkOptions = [
  'vanilla',
  'react',
];
