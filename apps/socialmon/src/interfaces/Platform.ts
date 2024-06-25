import type { Post } from '~/types';

export type Platform = {
  getRelevantPosts(): Promise<boolean>;
  getRepliedPosts(): Promise<Array<Post>>;
  getUnrepliedPosts(): Promise<Array<Post>>;
  replyToPost(post: Post): Promise<boolean>;
  updatePost(post: Post): Promise<boolean>;
};
