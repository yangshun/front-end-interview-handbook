import type {
  InterviewsActivity,
  InterviewsDiscussionComment,
} from '@prisma/client';

import type { QuestionFormat } from '../questions/common/QuestionsTypes';

type InterviewsCommonActivity = Readonly<{
  actor: {
    avatarUrl: string | null;
    id: string;
    name: string | null;
    username: string;
  };
  question: {
    format: QuestionFormat;
    href: string;
    slug: string;
    title: string;
  };
  recipient?: {
    avatarUrl: string | null;
    id: string;
    name: string | null;
    username: string;
  };
}>;

export type InterviewsCommentActivity = InterviewsCommonActivity &
  Omit<InterviewsActivity, 'category'> &
  Readonly<{
    category: 'DISCUSSION';
    comment: InterviewsDiscussionComment & {
      author: {
        id: string;
        name: string | null;
        username: string;
      };
      parentComment?: {
        author: {
          id: string;
          name: string | null;
          username: string;
        };
      };
      repliedTo?: {
        author: {
          id: string;
          name: string | null;
          username: string;
        };
      };
    };
  }>;

export type InterviewsUpvoteActivity = InterviewsCommonActivity &
  InterviewsCommonActivity &
  Omit<InterviewsActivity, 'category'> &
  Readonly<{
    actor: {
      avatarUrl: string | null;
      id: string;
      name: string | null;
      username: string;
    };
    category: 'DISCUSSION_UPVOTE';
    vote: {
      comment: InterviewsDiscussionComment & {
        author: {
          id: string;
          name: string | null;
          username: string;
        };
      };
    };
  }>;

export type InterviewsActivityExtended =
  | InterviewsCommentActivity
  | InterviewsUpvoteActivity;
