import type { Post } from '~/types';

export type Platform = {
  getPosts({
    pagination,
    filter,
  }: Readonly<{
    filter: { tab: string };
    pagination: { cursor?: string | null; limit: number };
  }>): Promise<{
    nextCursor?: string;
    posts: Array<Post>;
  }>;
  getRelevantPosts(): Promise<boolean>;
  replyToPost({
    postId,
    response,
  }: {
    postId: string;
    response: string;
  }): Promise<boolean>;
  updateResponse({
    id,
    response,
    repliedAt,
    replied,
  }: {
    id: string;
    replied: boolean;
    repliedAt: Date | null;
    response: string;
  }): Promise<boolean>;
};
