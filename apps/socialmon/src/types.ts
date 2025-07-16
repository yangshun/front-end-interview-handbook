import type { z } from 'zod';

import type {
  Activity,
  Project,
  RedditPost,
  RedditPostReply,
} from '~/prisma/client';

import type {
  aiFilterPostSchema,
  aiResponseSchema,
  projectSchema,
} from './schema';

// TODO: Consolidate repetition into Zod type
export type PostListTab = 'ALL' | 'IRRELEVANT' | 'PENDING' | 'REPLIED';

export type User = Readonly<{
  email?: string | null;
  image?: string | null;
  name?: string | null;
}>;

export type AIResponse = z.infer<typeof aiResponseSchema>;
export type AIFilterPost = z.infer<typeof aiFilterPostSchema>;

export type Comment = Readonly<{
  author: string;
  body: string;
  created_utc: number;
  id: string;
  replies: Comments | '';
  ups: number;
}>;

export type Comments = Readonly<{
  data: {
    children: Array<{
      data: Comment;
    }>;
  };
}>;

export type ActivityExtended = Activity &
  Readonly<{
    post: RedditPost;
    user: {
      id: string;
      name: string | null;
    };
  }>;

export type PostReplyExtended = Readonly<{
  redditUser: {
    username: string;
  };
  user: {
    id: string;
    name: string | null;
  };
}> &
  RedditPostReply;

export type PostExtended = Readonly<{
  activities?: ReadonlyArray<Omit<ActivityExtended, 'post'>>;
  reply?: PostReplyExtended | null;
}> &
  RedditPost;

export type ProjectTransformed = Omit<Project, 'productsToAdvertise'> &
  Readonly<{
    productsToAdvertise: Array<{
      description: string;
      url: string;
    }> | null;
    subredditKeywords: Array<{
      keywords: Array<string>;
      subreddits: Array<string>;
    }>;
  }>;

export type ProjectFormValues = z.infer<typeof projectSchema>;

export type FetchedRedditPost = Omit<
  RedditPost,
  'createdAt' | 'id' | 'projectId' | 'relevancy' | 'response' | 'updatedAt'
>;

export type QueriedRedditPost = Omit<
  RedditPost,
  | 'content'
  | 'postedAt'
  | 'postId'
  | 'projectId'
  | 'response'
  | 'response'
  | 'updatedAt'
> & {
  reply: RedditPostReply | null;
};
