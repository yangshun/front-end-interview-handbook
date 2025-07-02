import { Anchor, Badge, Button, Pill, Text, Tooltip } from '@mantine/core';
import Link from 'next/link';
import { RiArrowRightUpLine, RiCheckLine } from 'react-icons/ri';

import type { PostExtended } from '~/types';

import { redditPermalinkToUrl } from '../utils';
import PostStats from './PostStats';

type Props = Readonly<{
  post: PostExtended;
  showMarkedAsIrrelevant?: boolean;
  showRepliedBadge?: boolean;
  showViewPost?: boolean;
}>;

export default function PostMetadata({
  post,
  showMarkedAsIrrelevant,
  showRepliedBadge,
  showViewPost,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <PostStats post={post} />
          <div className="h-1 w-1 rounded-full bg-slate-600" />
          <Tooltip label="Post fetched at" withArrow={true}>
            <Text c="dimmed" size="sm">
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
          <div className="h-1 w-1 rounded-full bg-slate-600" />
          <Text size="sm">
            <Anchor
              className="z-1"
              href={`https://reddit.com/${post.subreddit}`}
              target="_blank"
              underline="hover">
              {post.subreddit}
            </Anchor>
          </Text>
        </div>
        {showViewPost && (
          <Button
            color="orange"
            component={Link}
            href={redditPermalinkToUrl(post.permalink)}
            rightSection={<RiArrowRightUpLine />}
            target="_blank"
            variant="subtle">
            View on Reddit
          </Button>
        )}
      </div>
      {post.keywords.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {post.keywords.map((keyword) => (
            <Pill key={keyword} size="sm">
              {keyword}
            </Pill>
          ))}
        </div>
      )}
      {post.reply && showRepliedBadge && (
        <div className="flex items-center gap-2">
          <Badge color="violet" leftSection={<RiCheckLine />} size="xs">
            Replied
          </Badge>
        </div>
      )}
      {post.relevancy === 'IRRELEVANT' && showMarkedAsIrrelevant && (
        <div className="flex items-center gap-2">
          <Badge color="violet" leftSection={<RiCheckLine />} size="xs">
            Marked as irrelevant
          </Badge>
        </div>
      )}
    </div>
  );
}
