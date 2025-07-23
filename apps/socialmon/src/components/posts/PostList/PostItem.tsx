import { Anchor, Box, Flex, Text, Title, Tooltip } from '@mantine/core';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';

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
  const postItemRef = useRef<HTMLDivElement>(null);

  // Scroll into view when this item becomes selected
  useEffect(() => {
    if (isSelected) {
      const timeoutId = setTimeout(() => {
        // Add a small delay to ensure DOM has updated and allow for smooth scrolling
        postItemRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }, 50);

      // Cleanup function to cancel timeout if component unmounts or isSelected changes
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isSelected]);

  return (
    <Box
      ref={postItemRef}
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
