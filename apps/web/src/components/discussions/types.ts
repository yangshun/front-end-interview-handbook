import type { ProjectsDiscussionCommentDomain } from '@prisma/client';

export type DiscussionsCommentUserProfile = Readonly<{
  userProfile: {
    avatarUrl: string | null;
    currentStatus: string | null;
    id: string;
    name: string | null;
    // TODO(projects): make compulsory.
    points?: number;
    startWorkDate: Date | null;
    title: string | null;
    username: string;
  };
}>;

export type DiscussionsCommentItem = Readonly<{
  _count: {
    votes: number;
  };
  author: DiscussionsCommentUserProfile;
  body: string;
  category: string | null;
  createdAt: Date;
  domain: ProjectsDiscussionCommentDomain;
  entityId: string;
  id: string;
  replies?: ReadonlyArray<DiscussionsCommentItem>;
  updatedAt: Date;
}>;

export type DiscussionsCommentSortField = 'createdAt' | 'votes';
