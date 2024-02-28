'use client';

import { trpc } from '~/hooks/trpc';

import ProjectsProfileCommunityListWithFilters from './ProjectsProfileCommunityListWithFilters';

import type {
  ProjectsDiscussionComment,
  ProjectsDiscussionCommentDomain,
} from '@prisma/client';

type ProjectsProfileCommunityCommentAuthor = Readonly<{
  userProfile: {
    avatarUrl: string | null;
    name: string | null;
    username: string;
  };
}>;

export type ProjectsProfileCommunityComment = ProjectsDiscussionComment &
  Readonly<{
    author: ProjectsProfileCommunityCommentAuthor;
  }> &
  Readonly<{
    entity?: Readonly<{
      href: string;
      title: string;
    }> | null;
  }> &
  Readonly<{
    parentComment: {
      author: ProjectsProfileCommunityCommentAuthor;
    } | null;
  }>;

type Props = Readonly<{
  isViewingOwnProfile: boolean;
  userId?: string;
}>;

export default function ProjectsProfileCommunitySection({
  isViewingOwnProfile = false,
  userId,
}: Props) {
  const domainList: Array<ProjectsDiscussionCommentDomain> = [
    'PROJECTS_SUBMISSION',
    'PROJECTS_CHALLENGE',
  ];
  const { data: profile } = trpc.profile.getProfile.useQuery();
  const { data: comments } = trpc.projects.comments.listUserComments.useQuery({
    domainList,
    userId: userId || profile?.id,
  });

  return (
    <ProjectsProfileCommunityListWithFilters
      comments={comments ?? []}
      isViewingOwnProfile={isViewingOwnProfile}
    />
  );
}
