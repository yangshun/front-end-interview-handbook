import type { ProjectsDiscussionCommentDomain } from '@prisma/client';

export type ProjectsDiscussionsCommentUserProfile = Readonly<{
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

export type ProjectsDiscussionsCommentItem = Readonly<{
  _count: {
    votes: number;
  };
  author: ProjectsDiscussionsCommentUserProfile;
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
