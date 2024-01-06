import type { Profile } from '@prisma/client';

export type Post = Readonly<{
  author: Profile;
  content: string;
  id: string;
  isQuestion: boolean;
  likeCount: number;
  replyCount: number;
}>;