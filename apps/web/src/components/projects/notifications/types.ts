import type { ProjectsChallengeSubmissionExtended } from '../submissions/types';

import type {
  ProjectsDiscussionComment,
  ProjectsNotification,
} from '.prisma/client';

export type ProjectsNotificationCategory = 'DISCUSSION' | 'UPVOTE';

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

export type ProjectsNotificationExtended = Readonly<
  Omit<ProjectsNotification, 'data'> & {
    projectsProfile: {
      userProfile: {
        username: string;
      };
    };
  }
>;

export type ProjectsNotificationDiscussionItemType = Readonly<
  ProjectsNotificationExtended & {
    category: 'DISCUSSION';
    comment: ProjectsNotificationDiscussionType;
    data?: null;
    submission: ProjectsChallengeSubmissionExtended;
  }
>;

export type ProjectsNotificationSubmissionUpvoteItemType = Readonly<
  ProjectsNotificationExtended & {
    category: 'UPVOTE';
    data: {
      count: number;
    };
    submission: ProjectsChallengeSubmissionExtended;
  }
>;

export type ProjectsNotificationAugmentedType =
  | ProjectsNotificationDiscussionItemType
  | ProjectsNotificationSubmissionUpvoteItemType;
