import type { Profile } from '@prisma/client';

export type ProjectsChallengeDiscussionPost = Readonly<{
  author: Profile;
  content: string;
  id: string;
  isQuestion: boolean;
  likeCount: number;
  replyCount: number;
}>;
