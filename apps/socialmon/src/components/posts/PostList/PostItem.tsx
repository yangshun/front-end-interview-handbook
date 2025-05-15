import { Box, Title } from '@mantine/core';
import clsx from 'clsx';
import Link from 'next/link';

import useCurrentProjectSlug from '~/hooks/useCurrentProjectSlug';

import type { PostExtended } from '~/types';

import PostMetadata from './PostMetadata';

type Props = Readonly<{
  post: Readonly<{
    commentsCount: number;
    createdAt: Date;
    id: string;
    keywords: ReadonlyArray<string>;
    statsUpdatedAt: Date;
    subreddit?: string;
    title: string;
    upvoteCount: number;
  }>;
  showMarkedAsIrrelevant?: boolean;
  showRepliedBadge?: boolean;
}>;

export default function PostItem({
  post,
  showMarkedAsIrrelevant,
  showRepliedBadge,
}: Props) {
  const projectSlug = useCurrentProjectSlug();

  return (
    <Box
      className={clsx(
        'w-full',
        'p-2',
        'rounded',
        'hover:bg-slate-100',
        'transition-all duration-200',
        'cursor-pointer',
        'flex flex-col gap-2',
        'text-left',
      )}
      component={Link}
      href={`/projects/${projectSlug}/posts/${post.id}`}>
      <Title order={5}>{post.title}</Title>
      <PostMetadata
        post={post as PostExtended}
        showMarkedAsIrrelevant={showMarkedAsIrrelevant}
        showRepliedBadge={showRepliedBadge}
      />
    </Box>
  );
}
