'use client';

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
      recipientUserName?: string;
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
  targetUserId?: string;
}>;

export default function ProjectsProfileCommunitySection({
  isViewingOwnProfile = false,
  targetUserId,
}: Props) {
  return (
    <ProjectsProfileCommunityListWithFilters
      isViewingOwnProfile={isViewingOwnProfile}
      targetUserId={targetUserId}
    />
  );
}
