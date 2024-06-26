import type { Post } from '~/types';

export type Platform = {
  getRelevantPosts(): Promise<boolean>;
  getRepliedPosts({
    cursor,
    limit,
  }: Readonly<{ cursor?: string | null; limit: number }>): Promise<{
    nextCursor?: string;
    posts: Array<Post>;
  }>;
  getUnrepliedPosts({
    cursor,
    limit,
  }: Readonly<{ cursor?: string | null; limit: number }>): Promise<{
    nextCursor?: string;
    posts: Array<Post>;
  }>;
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
