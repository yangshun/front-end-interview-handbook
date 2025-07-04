import { Badge, Button, Pill } from '@mantine/core';
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
    <div className="flex flex-col gap-1">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-4">
          <PostStats post={post} />
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
        {showViewPost && (
          <Button
            color="orange"
            component={Link}
            href={redditPermalinkToUrl(post.permalink)}
            rightSection={<RiArrowRightUpLine />}
            size="xs"
            target="_blank"
            variant="light">
            View on Reddit
          </Button>
        )}
      </div>
    </div>
  );
}
