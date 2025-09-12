import type { InterviewsDiscussionCommentDomain } from '@prisma/client';

export type CodingWorkspaceDiscussionsCommentAuthor = Readonly<{
  avatarUrl: string | null;
  id: string;
  name: string | null;
  username: string;
}>;

export type CodingWorkspaceDiscussionsCommentItem = Readonly<{
  _count: {
    votes: number;
  };
  author: CodingWorkspaceDiscussionsCommentAuthor;
  body: string;
  createdAt: Date;
  domain: InterviewsDiscussionCommentDomain;
  entityId: string;
  id: string;
  parentCommentId: string | null;
  profileId: string;
  replies?: ReadonlyArray<CodingWorkspaceDiscussionsCommentItem>;
  updatedAt: Date;
}>;

export type CodingWorkspaceDiscussionsCommentSortField = 'createdAt' | 'votes';
