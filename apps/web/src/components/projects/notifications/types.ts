import type {
  ProjectsDiscussionComment,
  ProjectsNotification,
} from '@prisma/client';

import type { ProjectsChallengeSubmissionExtended } from '../submissions/types';

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
    parentComment?: ProjectsDiscussionComment;
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

export type ProjectsNotificationSubmissionDiscussionItemType = Readonly<
  ProjectsNotificationExtended & {
    category: 'DISCUSSION';
    comment: ProjectsNotificationDiscussionType;
    submission: ProjectsChallengeSubmissionExtended;
  }
>;

export type ProjectsNotificationChallengeDiscussionItemType = Readonly<
  ProjectsNotificationExtended & {
    category: 'DISCUSSION';
    challenge: {
      href: string;
      title: string;
    };
    comment: ProjectsNotificationDiscussionType;
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
  | ProjectsNotificationChallengeDiscussionItemType
  | ProjectsNotificationSubmissionDiscussionItemType
  | ProjectsNotificationSubmissionUpvoteItemType;
