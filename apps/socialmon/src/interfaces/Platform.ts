import type { Post } from '~/models/Post';

export type Platform = {
  getRelevantPosts(): Promise<Array<Post>>;
  getRepliedPosts(): Promise<Array<Post>>;
  getUnrepliedPosts(): Promise<Array<Post>>;
  replyToPost(post: Post): Promise<boolean>;
  updatePost(post: Post): Promise<boolean>;
};
