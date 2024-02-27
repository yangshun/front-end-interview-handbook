'use client';

import { trpc } from '~/hooks/trpc';

import ProjectsContributionListWithFilters from './ProjectsContributionListWithFilters';

import type {
  ProjectsDiscussionComment,
  ProjectsDiscussionCommentDomain,
} from '@prisma/client';

type CommentAuthor = Readonly<{
  userProfile: {
    avatarUrl: string | null;
    name: string | null;
    username: string;
  };
}>;

export type ContributionComment = ProjectsDiscussionComment &
  Readonly<{
    author: CommentAuthor;
  }> &
  Readonly<{
    entity?: Readonly<{
      href: string;
      title: string;
    }> | null;
  }> &
  Readonly<{
    parentComment: {
      author: CommentAuthor;
    } | null;
  }>;

type Props = Readonly<{
  userId?: string;
}>;

export default function ProjectsContributionsSection({ userId }: Props) {
  const domainList: Array<ProjectsDiscussionCommentDomain> = [
    'PROJECTS_SUBMISSION',
    'PROJECTS_CHALLENGE',
  ];
  const { data: profile } = trpc.profile.getProfile.useQuery();
  const { data: comments } = trpc.comments.listUserComments.useQuery({
    domainList,
    userId: userId || profile?.id,
  });

  return <ProjectsContributionListWithFilters comments={comments ?? []} />;
}
