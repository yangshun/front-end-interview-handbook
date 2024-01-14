import type { ProjectsSkill } from '../skills/types';

import type { ProjectsChallengeSubmission } from '@prisma/client';

export type ProjectsChallengeSubmissionAuthor = Readonly<{
  avatarUrl: string | null;
  githubUsername?: string | null;
  id: string;
  linkedInUsername?: string | null;
  name: string | null;
  title: string | null;
  username: string;
}>;

export type ProjectsChallengeSubmissionItem = Readonly<{
  author?: ProjectsChallengeSubmissionAuthor | null | undefined;
  comments: number;
  createdAt: Date;
  deploymentUrls: Array<Readonly<{ href: string; label: string }>>;
  id: string;
  imgSrc: string;
  implementation: string;
  repositoryUrl: string;
  slug: string;
  stack: Array<ProjectsSkill>;
  summary: string;
  title: string;
  views: number;
  votes: number;
}>;

export type ProjectsChallengeSubmissionFromDatabase =
  ProjectsChallengeSubmission &
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

// TODO(projects): Remove in future.
export function addMissingFieldsToSubmission<
  T extends ProjectsChallengeSubmissionFromDatabase,
>(submission: T): ProjectsChallengeSubmissionItem {
  return {
    ...submission,
    author: submission.projectsProfile?.userProfile,
    comments: 42,
    deploymentUrls: submission.deploymentUrls as Array<
      Readonly<{ href: string; label: string }>
    >,
    imgSrc: 'https://source.unsplash.com/random/48x48',
    stack: [],
    votes: submission._count.votes,
  };
}

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
