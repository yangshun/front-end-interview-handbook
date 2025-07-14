import { Button } from '@mantine/core';
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiExternalLinkLine,
} from 'react-icons/ri';

import type { trpc } from '~/hooks/trpc';

import type { PostExtended } from '~/types';

import type { PostFromQuery } from './PostsContext';
import { redditPermalinkToUrl } from './utils';
type MarkRelevancyMutation = ReturnType<typeof trpc.socialPosts.markPostRelevancy.useMutation>;
type MarkReplyStatusMutation = ReturnType<typeof trpc.socialPosts.markPostReplyStatus.useMutation>;

type Props = {
  adjacentPosts: { next: PostFromQuery | null; prev: PostFromQuery | null; };
  handleNextPost: () => void;
  handlePrevPost: () => void;
  markAsIrrelevant: () => void;
  markAsNotReplied: () => void;
  markAsRelevant: () => void;
  markAsReplied: () => void;
  markRelevancyMutation: MarkRelevancyMutation;
  markReplyStatusMutation: MarkReplyStatusMutation;
  post: PostExtended;
}

export default function PostDetailBottomBar({
  adjacentPosts,
  handleNextPost,
  handlePrevPost,
  markAsIrrelevant,
  markAsNotReplied,
  markAsRelevant,
  markAsReplied,
  markRelevancyMutation,
  markReplyStatusMutation,
  post,
}: Props) {
  return (
    <div className="sticky bottom-0 border-t border-gray-200 bg-white pb-2 pt-2">
      <div className="flex items-center justify-between">
        {/* Left side: Navigation buttons */}
        <div className="flex items-center gap-2">
          <Button
            disabled={!adjacentPosts.prev}
            leftSection={<RiArrowLeftSLine className="size-4" />}
            size="xs"
            variant="subtle"
            onClick={handlePrevPost}>
            Previous
          </Button>
          <Button
            disabled={!adjacentPosts.next}
            rightSection={<RiArrowRightSLine className="size-4" />}
            size="xs"
            variant="subtle"
            onClick={handleNextPost}>
            Next
          </Button>
        </div>
        {/* Right side: Action buttons */}
        <div className="flex items-center gap-2">
          {/* Relevancy Toggle Button */}
          <Button
            color={post.relevancy === 'IRRELEVANT' ? 'blue' : 'orange'}
            disabled={markRelevancyMutation.isLoading}
            size="xs"
            variant="subtle"
            onClick={
              post.relevancy === 'IRRELEVANT'
                ? markAsRelevant
                : markAsIrrelevant
            }>
            {markRelevancyMutation.isLoading
              ? 'Marking...'
              : post.relevancy === 'IRRELEVANT'
                ? 'Mark as Relevant'
                : 'Mark as Irrelevant'}
          </Button>
          {/* Reply Status Toggle Button */}
          <Button
            color={
              post.replied === 'REPLIED_MANUALLY' ||
              post.replied === 'REPLIED_VIA_APP'
                ? 'red'
                : 'green'
            }
            disabled={markReplyStatusMutation.isLoading}
            size="xs"
            variant="subtle"
            onClick={
              post.replied === 'REPLIED_MANUALLY' ||
              post.replied === 'REPLIED_VIA_APP'
                ? markAsNotReplied
                : markAsReplied
            }>
            {markReplyStatusMutation.isLoading
              ? 'Marking...'
              : post.replied === 'REPLIED_MANUALLY' ||
                  post.replied === 'REPLIED_VIA_APP'
                ? 'Mark as Not Replied'
                : 'Mark as Replied'}
          </Button>
          <Button
            color="blue"
            component="a"
            href={redditPermalinkToUrl(post.permalink)}
            rel="noopener noreferrer"
            rightSection={<RiExternalLinkLine className="size-4" />}
            size="xs"
            target="_blank"
            variant="subtle">
            View on Reddit
          </Button>
        </div>
      </div>
    </div>
  );
}
