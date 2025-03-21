import type {
  ProjectsChallengeInfo,
  ProjectsChallengeMetadata,
} from 'contentlayer/generated';

import type { PrismaClientGFE } from '~/server/prisma';

import type { ProjectsImageBreakpointCategory } from '../common/ProjectsImageBreakpoints';

import type {
  ProjectsChallengeSessionStatus,
  ProjectsProfile,
} from '@prisma/client';
import { Prisma } from '@prisma/client';

export type ProjectsChallengeSubmissionExtended = Prisma.Result<
  PrismaClientGFE['projectsChallengeSubmission'],
  Prisma.Args<PrismaClientGFE['projectsChallengeSubmission'], 'findUnique'>,
  'findUnique'
>;

export type ProjectsChallengeSubmissionDeploymentUrlItem = {
  href: string;
  images?: Record<ProjectsImageBreakpointCategory, string>;
  label: string;
  updatedAt?: Date | null;
};

export type ProjectsChallengeSubmissionDeploymentUrls =
  Array<ProjectsChallengeSubmissionDeploymentUrlItem>;

// Subset of relevant fields from Prisma.Profile.
export type ProjectsChallengeSubmissionAuthor = Readonly<{
  avatarUrl: string | null;
  company: string | null;
  currentStatus: string | null;
  githubUsername?: string | null;
  id: string;
  linkedInUsername?: string | null;
  name: string | null;
  startWorkDate: Date | null;
  title: string | null;
  username: string;
  website?: string | null;
}>;

export type ProjectsChallengeSubmissionAugmented =
  ProjectsChallengeSubmissionExtended &
    Readonly<{
      _count: {
        votes: number;
      };
      challenge?: Readonly<{
        info: ProjectsChallengeInfo;
        metadata: ProjectsChallengeMetadata;
        status: ProjectsChallengeSessionStatus | null;
      }>;
      comments?: number | null;
      projectsProfile?:
        | (ProjectsProfile & {
            userProfile?: ProjectsChallengeSubmissionAuthor | null | undefined;
          })
        | null
        | undefined;
    }>;

export const ProjectsChallengeSubmissionSortField = [
  Prisma.ProjectsChallengeSubmissionScalarFieldEnum.createdAt,
  Prisma.ProjectsChallengeDetailsScalarFieldEnum.difficulty,
  'recommended',
  'votes',
] as const;

export type ProjectsChallengeSubmissionSortField =
  (typeof ProjectsChallengeSubmissionSortField)[number];

export type ProjectsChallengeSubmissionStatusFilter =
  | 'COMPLETED'
  | 'IN_PROGRESS'
  | 'NOT_STARTED';

export const ProjectsChallengeSubmissionYOEFilter = [
  'junior',
  'mid',
  'senior',
] as const;
export type ProjectsChallengeSubmissionYOEFilter =
  (typeof ProjectsChallengeSubmissionYOEFilter)[number];

export const ProjectsChallengeSubmissionTabType = [
  'all',
  'learn',
  'mentor',
] as const;
export type ProjectsChallengeSubmissionTabType =
  (typeof ProjectsChallengeSubmissionTabType)[number];
