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
      bg={isSelected ? 'gray.1' : 'white'}
      className={clsx('w-full', 'px-4 py-4', 'flex flex-col gap-1')}
      onClick={onClick} // Use onClick instead of Link
    >
      <Title className="line-clamp-1" order={3} size="h5">
        {post.title}
      </Title>
      <PostMetadata
        post={post as PostExtended}
        showMarkedAsIrrelevant={showMarkedAsIrrelevant}
        showRepliedBadge={showRepliedBadge}
      />
    </Box>
  );
}
