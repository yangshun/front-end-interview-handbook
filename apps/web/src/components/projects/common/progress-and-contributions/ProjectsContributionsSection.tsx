'use client';

import { trpc } from '~/hooks/trpc';

import ProjectsContributionListWithFilters from './ProjectsContributionListWithFilters';

import type {
  DiscussionComment,
  DiscussionCommentDomain,
} from '@prisma/client';

export type ContributionComment = DiscussionComment & {
  author: {
    avatarUrl: string | null;
    name: string | null;
    username: string;
  };
} & {
  entity?: {
    href: string;
    title: string;
  } | null;
} & {
  parentComment: {
    author: {
      avatarUrl: string | null;
      name: string | null;
      username: string;
    };
  } | null;
};

type Props = Readonly<{
  userId?: string;
}>;

export default function ProjectsContributionsSection({ userId }: Props) {
  const domainList: Array<DiscussionCommentDomain> = [
    'PROJECTS_SUBMISSION',
    'PROJECTS_CHALLENGE',
  ];
  const { data: comments } = trpc.comments.listUserComments.useQuery({
    domainList,
    userId,
  });

  return <ProjectsContributionListWithFilters comments={comments ?? []} />;
}
