import { Badge, Button } from '@mantine/core';
import Link from 'next/link';
import { RiArrowRightUpLine } from 'react-icons/ri';

import type { PostExtended } from '~/types';

import { redditPermalinkToUrl } from '../utils';
import PostStats from './PostStats';

type Props = Readonly<{
  post: PostExtended;
  showViewPost?: boolean;
}>;

export default function PostMetadata({ post, showViewPost }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="flex flex-wrap items-center gap-4">
        <PostStats post={post} />
        {(post.replied === 'REPLIED_MANUALLY' ||
          post.replied === 'REPLIED_VIA_APP') && (
          <Badge color="orange" size="sm" variant="light">
            Replied
          </Badge>
        )}
        {post.relevancy === 'IRRELEVANT' && (
          <Badge color="blue" size="sm" variant="light">
            Irrelevant
          </Badge>
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
          variant="subtle">
          View on Reddit
        </Button>
      )}
    </div>
  );
}
