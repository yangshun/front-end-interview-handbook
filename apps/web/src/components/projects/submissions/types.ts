import type { ProjectsSkill } from '../skills/types';

import type { ProjectsChallengeSubmission } from '@prisma/client';

type ProjectsChallengeSubmissionAuthor = Readonly<{
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
  id: string;
  imgSrc: string;
  likes: number;
  stack: Array<ProjectsSkill>;
  summary: string;
  title: string;
  views: number;
}>;

export type ProjectsChallengeSubmissionFromDatabase =
  ProjectsChallengeSubmission &
    Readonly<{
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
    comments: 23,
    imgSrc: 'https://source.unsplash.com/random/48x48',
    likes: 56,
    stack: [],
  };
}
