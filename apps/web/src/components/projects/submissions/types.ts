import type { PrismaClientGFE } from '~/server/prisma';

import type { Prisma } from '@prisma/client';

export type ProjectsChallengeSubmissionExtended = Prisma.Result<
  PrismaClientGFE['projectsChallengeSubmission'],
  Prisma.Args<PrismaClientGFE['projectsChallengeSubmission'], 'findUnique'>,
  'findUnique'
>;

// Subset of relevant fields from Prisma.Profile.
export type ProjectsChallengeSubmissionAuthor = Readonly<{
  avatarUrl: string | null;
  githubUsername?: string | null;
  id: string;
  linkedInUsername?: string | null;
  name: string | null;
  title: string | null;
  username: string;
}>;

export type ProjectsChallengeSubmissionWithVotesAndAuthor =
  ProjectsChallengeSubmissionExtended &
    Readonly<{
      _count: {
        votes: number;
      };
      projectsProfile?:
        | {
            userProfile?: ProjectsChallengeSubmissionAuthor | null | undefined;
          }
        | null
        | undefined;
    }>;

export type ProjectsChallengeSubmissionSortField =
  | 'createdAt'
  | 'difficulty'
  | 'votes';

export type ProjectsChallengeSubmissionStatusFilter =
  | 'COMPLETED'
  | 'IN_PROGRESS'
  | 'NOT_STARTED';

export type ProjectsChallengeSubmissionYOEFilter = 'junior' | 'mid' | 'senior';

export type ProjectsChallengeSubmissionTabType = 'all' | 'learn' | 'mentor';
