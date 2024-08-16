import clsx from 'clsx';
import Link from 'next/link';

import useCurrentProjectSlug from '~/hooks/useCurrentProjectSlug';

import PostMetadata from './PostMetadata';

import type { PostExtended } from '~/types';

import '@mantine/core/styles.css';

import { Box, Title } from '@mantine/core';

type Props = Readonly<{
  post: PostExtended;
  showMarkedAsIrrelevant?: boolean;
  showRepliedBadge?: boolean;
}>;

export default function PostItem({
  post,
  showRepliedBadge,
  showMarkedAsIrrelevant,
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
        post={post}
        showMarkedAsIrrelevant={showMarkedAsIrrelevant}
        showRepliedBadge={showRepliedBadge}
      />
    </Box>
  );
}
