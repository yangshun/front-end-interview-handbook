'use client';

import { ActionIcon, Tooltip } from '@mantine/core';
import { useEffect } from 'react';
import { useHotkeysContext } from 'react-hotkeys-hook';
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiExternalLinkLine,
} from 'react-icons/ri';

import KeyboardChar from '~/components/common/KeyboardChar';
import { useIsMobileModal } from '~/components/ui/MobilePostModal';

import type { PostExtended } from '~/types';

import { usePostDetailShortcuts } from './hooks/usePostDetailShortcuts';
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
  const { disableScope, enableScope } = useHotkeysContext();
  const isInMobileModal = useIsMobileModal();
  const {
    adjacentPosts,
    handleNextPost,
    handlePrevPost,
    markPostRelevancy,
    markPostReplyStatus,
  } = usePostsContext();

  const toggleRelevant = () => {
    markPostRelevancy(
      post.id,
      post.relevancy === 'IRRELEVANT' ? 'RELEVANT' : 'IRRELEVANT',
    );
  };

  const toggleReplied = () => {
    markPostReplyStatus(
      post.id,
      post.replied === 'NOT_REPLIED' ? 'REPLIED_MANUALLY' : 'NOT_REPLIED',
    );
  };

  usePostDetailShortcuts({
    enabled: !isInMobileModal,
    onNextPost: handleNextPost,
    onPrevPost: handlePrevPost,
    onToggleRelevant: toggleRelevant,
    onToggleReplied: toggleReplied,
    post,
  });

  // Enable the post-detail scope when this component mounts
  useEffect(() => {
    enableScope('post-detail');

    return () => {
      disableScope('post-detail');
    };
  }, [disableScope, enableScope]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto">
        <PostDetailPage post={post} showBackButton={false} />
      </div>
      <div className="sticky bottom-0 left-0 right-0 z-10 flex items-center justify-between border-t border-gray-200 bg-white px-4 pb-3 pt-3">
        {/* Navigation buttons */}
        <div className="flex items-center gap-2">
          <Tooltip
            label={
              <>
                Previous post <KeyboardChar char="K" />
              </>
            }
            withArrow={true}>
            <ActionIcon
              aria-label="Previous post"
              disabled={!adjacentPosts.prev}
              size="lg"
              variant="default"
              onClick={handlePrevPost}>
              <RiArrowLeftSLine />
            </ActionIcon>
          </Tooltip>
          <Tooltip
            label={
              <>
                Next post <KeyboardChar char="J" />
              </>
            }
            withArrow={true}>
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
          <Tooltip
            label={
              <>
                View on Reddit <KeyboardChar char="E" />
              </>
            }
            withArrow={true}>
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
