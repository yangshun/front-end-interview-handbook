import type { ProjectsChallengeSubmissionExtended } from '../submissions/types';

import type {
  ProjectsDiscussionComment,
  ProjectsNotification,
} from '@prisma/client';

export type ProjectsNotificationCategory = 'DISCUSSION' | 'UPVOTE';

export type ProjectsNotificationUpvoteDataType = Readonly<{
  count: number;
  entityId: string;
}>;

type ProjectsNotificationCommentAuthor = Readonly<{
  points: number;
  userId?: string;
  userProfile: {
    avatarUrl: string | null;
    company: string | null;
    currentStatus: string | null;
    id: string;
    name: string | null;
    startWorkDate: Date | null;
    title: string | null;
    username: string;
  };
}>;

export type ProjectsNotificationDiscussionType = ProjectsDiscussionComment &
  Readonly<{
    author: ProjectsNotificationCommentAuthor;
  }>;

export type ProjectsNotificationDiscussionItemType = Readonly<
  Omit<ProjectsNotification, 'data'> & {
    category: 'DISCUSSION';
    comment: ProjectsNotificationDiscussionType;
    data?: null;
    submission: ProjectsChallengeSubmissionExtended;
  }
>;

export type ProjectsNotificationSubmissionUpvoteItemType = Readonly<
  Omit<ProjectsNotification, 'data'> & {
    category: 'UPVOTE';
    data: ProjectsNotificationUpvoteDataType;
    submission: ProjectsChallengeSubmissionExtended;
  }
>;

export type ProjectsNotificationAugmentedType =
  | ProjectsNotificationDiscussionItemType
  | ProjectsNotificationSubmissionUpvoteItemType;
