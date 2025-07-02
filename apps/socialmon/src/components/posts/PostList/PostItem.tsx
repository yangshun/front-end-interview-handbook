import { Box, Title } from '@mantine/core';
import clsx from 'clsx';

import type { PostExtended } from '~/types';

import PostMetadata from './PostMetadata';

type Props = Readonly<{
  isSelected?: boolean;
  onClick?: () => void;
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
  isSelected,
  onClick,
  post,
  showMarkedAsIrrelevant,
  showRepliedBadge,
}: Props) {
  return (
    <Box
      className={clsx(
        'w-full',
        'px-1',
        'py-4',
        'rounded',
        'transition-all duration-200',
        'flex flex-col gap-2',
        'text-left',
        isSelected && 'border-l-4 border-blue-500 bg-blue-50', // Selection styling
      )}
      onClick={onClick} // Use onClick instead of Link
    >
      <Title order={5}>{post.title}</Title>
      <PostMetadata
        post={post as PostExtended}
        showMarkedAsIrrelevant={showMarkedAsIrrelevant}
        showRepliedBadge={showRepliedBadge}
      />
    </Box>
  );
}
