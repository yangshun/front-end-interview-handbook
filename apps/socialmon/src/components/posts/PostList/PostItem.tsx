import { Anchor, Box, Flex, Text, Title, Tooltip } from '@mantine/core';
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
}>;

export default function PostItem({ isSelected, onClick, post }: Props) {
  return (
    <Box
      bg={isSelected ? 'gray.1' : 'white'}
      className={clsx('w-full', 'p-3', 'flex flex-col', 'rounded-lg')}
      onClick={onClick} // Use onClick instead of Link
    >
      <Flex align="center" gap={4}>
        <Anchor
          className="z-1"
          href={`https://reddit.com/${post.subreddit}`}
          target="_blank"
          underline="hover">
          <Text className="black" fw={500} size="xs">
            {post.subreddit}
          </Text>
        </Anchor>
        <Text fw="bold" size="xs">
          &middot;
        </Text>
        <Tooltip label="Post fetched at" withArrow={true}>
          <Text c="dimmed" size="xs" span={true}>
            {new Intl.DateTimeFormat(undefined, {
              day: 'numeric',
              hour: 'numeric',
              hour12: true,
              minute: '2-digit',
              month: 'long',
              weekday: 'long',
              year: 'numeric',
            }).format(post.createdAt)}
          </Text>
        </Tooltip>
      </Flex>
      <Title className="line-clamp-2" mb={6} mt={2} order={3} size="h5">
        {post.title}
      </Title>
      <PostMetadata post={post as PostExtended} />
    </Box>
  );
}
