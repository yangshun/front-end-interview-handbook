'use client';

import { useHotkeys } from 'react-hotkeys-hook';

import type { PostExtended } from '~/types';

import { redditPermalinkToUrl } from '../utils';

type UsePostDetailShortcutsProps = {
  enabled: boolean;
  onNextPost: () => void;
  onPrevPost: () => void;
  onToggleRelevant: () => void;
  onToggleReplied: () => void;
  post: PostExtended;
};

export function usePostDetailShortcuts({
  enabled,
  onNextPost,
  onPrevPost,
  onToggleRelevant,
  onToggleReplied,
  post,
}: UsePostDetailShortcutsProps) {
  // Navigation shortcuts
  useHotkeys('j', onNextPost, {
    description: 'Go to next post',
    enabled,
    scopes: ['post-detail'],
  });

  useHotkeys('k', onPrevPost, {
    description: 'Go to previous post',
    enabled,
    scopes: ['post-detail'],
  });

  // Action shortcuts
  useHotkeys('t', onToggleRelevant, {
    description: 'Toggle post relevance',
    enabled,
    scopes: ['post-detail'],
  });

  useHotkeys('r', onToggleReplied, {
    description: 'Toggle reply status',
    enabled,
    scopes: ['post-detail'],
  });

  useHotkeys(
    'e',
    () => {
      if (post.permalink) {
        const url = redditPermalinkToUrl(post.permalink);

        window.open(url, '_blank');
      }
    },
    {
      description: 'Open post on Reddit',
      enabled,
      scopes: ['post-detail'],
    },
  );
}
