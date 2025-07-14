'use client';

import { ActionIcon, Tooltip } from '@mantine/core';
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiExternalLinkLine,
} from 'react-icons/ri';

import type { PostExtended } from '~/types';

import PostDetailPage from './PostDetailPage';
import PostRelevanceActionButton from './PostRelevanceActionButton';
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
          <Tooltip label="Previous post" withArrow={true}>
            <ActionIcon
              aria-label="Previous post"
              disabled={!adjacentPosts.prev}
              size="lg"
              variant="default"
              onClick={handlePrevPost}>
              <RiArrowLeftSLine />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Next post" withArrow={true}>
            <ActionIcon
              aria-label="Next post"
              disabled={!adjacentPosts.next}
              size="lg"
              variant="default"
              onClick={handleNextPost}>
              <RiArrowRightSLine />
            </ActionIcon>
          </Tooltip>
        </div>
        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <PostRelevanceActionButton
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
            <ActionIcon
              aria-label="View on Reddit"
              color="orange"
              component="a"
              href={redditPermalinkToUrl(post.permalink)}
              rel="noopener noreferrer"
              size="lg"
              target="_blank"
              variant="light">
              <RiExternalLinkLine />
            </ActionIcon>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
