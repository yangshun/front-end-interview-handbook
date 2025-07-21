'use client';

import { useHotkeys } from 'react-hotkeys-hook';

import { getShortcut, ShortcutAction } from '~/config/shortcuts';
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
  const nextPostShortcut = getShortcut(ShortcutAction.NEXT_POST);

  useHotkeys(String(nextPostShortcut.keys), onNextPost, {
    description: nextPostShortcut.description,
    enabled,
    scopes: [nextPostShortcut.scope as string],
  });

  const prevPostShortcut = getShortcut(ShortcutAction.PREV_POST);

  useHotkeys(String(prevPostShortcut.keys), onPrevPost, {
    description: prevPostShortcut.description,
    enabled,
    scopes: [prevPostShortcut.scope as string],
  });

  // Action shortcuts
  const toggleRelevanceShortcut = getShortcut(ShortcutAction.TOGGLE_RELEVANCE);

  useHotkeys(String(toggleRelevanceShortcut.keys), onToggleRelevant, {
    description: toggleRelevanceShortcut.description,
    enabled,
    scopes: [toggleRelevanceShortcut.scope as string],
  });

  const toggleReplyShortcut = getShortcut(ShortcutAction.TOGGLE_REPLY_STATUS);

  useHotkeys(String(toggleReplyShortcut.keys), onToggleReplied, {
    description: toggleReplyShortcut.description,
    enabled,
    scopes: [toggleReplyShortcut.scope as string],
  });

  const openRedditShortcut = getShortcut(ShortcutAction.OPEN_ON_REDDIT);

  useHotkeys(
    String(openRedditShortcut.keys),
    () => {
      if (post.permalink) {
        const url = redditPermalinkToUrl(post.permalink);

        window.open(url, '_blank');
      }
    },
    {
      description: openRedditShortcut.description,
      enabled,
      scopes: [openRedditShortcut.scope as string],
    },
  );
}
