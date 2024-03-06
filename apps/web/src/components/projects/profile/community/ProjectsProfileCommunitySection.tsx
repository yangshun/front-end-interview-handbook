'use client';

import { trpc } from '~/hooks/trpc';

import ProjectsProfileCommunityListWithFilters from './ProjectsProfileCommunityListWithFilters';

import type { ProjectsDiscussionComment } from '@prisma/client';

type ProjectsProfileCommunityCommentAuthor = Readonly<{
  userId?: string;
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
      recipient?: string;
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
  const { data: profile } = trpc.profile.getProfile.useQuery();

  return (
    <ProjectsProfileCommunityListWithFilters
      isViewingOwnProfile={isViewingOwnProfile}
      userId={userId || profile?.id}
    />
  );
}
