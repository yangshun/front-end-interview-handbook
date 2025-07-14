'use client';

import { Button, Tooltip } from '@mantine/core';
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiExternalLinkLine,
} from 'react-icons/ri';

import type { PostExtended } from '~/types';

import PostDetailPage from './PostDetailPage';
import PostRelevancyActionButton from './PostRelevancyActionButton';
import PostReplyStatusActionButton from './PostReplyStatusActionButton';
import { usePostsContext } from './PostsContext';
import { redditPermalinkToUrl } from './utils';

export default function InterceptedPostDetailClient({
  post,
}: {
  post: PostExtended;
}) {
  const { adjacentPosts, handleNextPost, handlePrevPost } = usePostsContext();

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        <PostDetailPage post={post} showBackButton={false} />
      </div>
      <div className="sticky bottom-0 left-0 right-0 z-10 flex items-center justify-between border-t border-gray-200 bg-white px-4 pb-3 pt-3">
        {/* Navigation buttons */}
        <div className="flex items-center gap-2">
          <Tooltip label="Previous Post" withArrow={true}>
            <Button
              aria-label="Previous Post"
              disabled={!adjacentPosts.prev}
              size="xs"
              variant="subtle"
              onClick={handlePrevPost}>
              <RiArrowLeftSLine className="size-4" />
            </Button>
          </Tooltip>
          <Tooltip label="Next Post" withArrow={true}>
            <Button
              aria-label="Next Post"
              disabled={!adjacentPosts.next}
              size="xs"
              variant="subtle"
              onClick={handleNextPost}>
              <RiArrowRightSLine className="size-4" />
            </Button>
          </Tooltip>
        </div>
        {/* Action buttons (Mantine + react-icons/ri) */}
        <div className="flex items-center gap-2">
          <PostRelevancyActionButton
            iconOnly={true}
            postId={post.id}
            relevancy={post.relevancy}
          />
          <PostReplyStatusActionButton
            iconOnly={true}
            postId={post.id}
            replyStatus={post.replied}
          />
          <Tooltip label="View on Reddit" withArrow={true}>
            <Button
              aria-label="View on Reddit"
              color="blue"
              component="a"
              href={redditPermalinkToUrl(post.permalink)}
              rel="noopener noreferrer"
              size="xs"
              target="_blank"
              variant="subtle">
              <RiExternalLinkLine className="size-4" />
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
