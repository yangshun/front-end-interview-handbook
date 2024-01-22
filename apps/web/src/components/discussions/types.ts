import type { DiscussionCommentDomain } from '@prisma/client';

export type DiscussionsCommentUserProfile = Readonly<{
  avatarUrl: string | null;
  id: string;
  name: string | null;
  title: string | null;
  username: string;
}>;

export type DiscussionsCommentItem = Readonly<{
  _count: {
    votes: number;
  };
  author: DiscussionsCommentUserProfile;
  body: string;
  category: string | null;
  createdAt: Date;
  domain: DiscussionCommentDomain;
  entityId: string;
  id: string;
  replies?: ReadonlyArray<DiscussionsCommentItem>;
  updatedAt: Date;
}>;

export type DiscussionsCommentSortField = 'createdAt' | 'votes';
