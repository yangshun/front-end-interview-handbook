import { Badge, Button, Pill, Text, Tooltip } from '@mantine/core';
import Link from 'next/link';
import { RiArrowRightUpLine, RiCheckLine } from 'react-icons/ri';

import RelativeTimestamp from '~/components/common/datetime/RelativeTimestamp';

import type { PostExtended } from '~/types';

import { redditPermalinkToUrl } from '../utils';
import PostStats from './PostStats';

type Props = Readonly<{
  post: PostExtended;
  showMarkedAsIrrelevant?: boolean;
  showRepliedBadge?: boolean;
  showViewPost?: boolean;
}>;

function PostMetadata({
  post,
  showViewPost,
  showRepliedBadge,
  showMarkedAsIrrelevant,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <PostStats post={post} />

          <div className="h-1 w-1 rounded-full bg-slate-600" />

          <Tooltip label="Post fetched at" withArrow={true}>
            <Text size="sm">
              <RelativeTimestamp timestamp={new Date(post.createdAt)} />
            </Text>
          </Tooltip>

          <div className="h-1 w-1 rounded-full bg-slate-600" />

          <Text size="sm">{post.subreddit}</Text>
        </div>

        {showViewPost && (
          <Button
            component={Link}
            href={redditPermalinkToUrl(post.permalink)}
            rightSection={<RiArrowRightUpLine />}
            target="_blank"
            variant="subtle">
            View Post
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
            Marked as Irrelevant
          </Badge>
        </div>
      )}
    </div>
  );
}

export default PostMetadata;
