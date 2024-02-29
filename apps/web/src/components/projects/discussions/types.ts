import type { ProjectsDiscussionCommentDomain } from '@prisma/client';

export type ProjectsDiscussionsCommentAuthor = Readonly<{
  points: number;
  userProfile: {
    avatarUrl: string | null;
    company: string | null;
    currentStatus: string | null;
    id: string;
    name: string | null;
    startWorkDate: Date | null;
    title: string | null;
    username: string;
  };
}>;

export type ProjectsDiscussionsCommentItem = Readonly<{
  _count: {
    votes: number;
  };
  author: ProjectsDiscussionsCommentAuthor;
  body: string;
  category: string | null;
  createdAt: Date;
  domain: ProjectsDiscussionCommentDomain;
  entityId: string;
  id: string;
  replies?: ReadonlyArray<ProjectsDiscussionsCommentItem>;
  updatedAt: Date;
}>;

export type ProjectsDiscussionsCommentSortField = 'createdAt' | 'votes';
