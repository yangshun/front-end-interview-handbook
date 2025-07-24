'use client';

import { useHotkeys } from 'react-hotkeys-hook';

import { getShortcut, ShortcutAction } from '~/config/shortcuts';
import type { PostListTab } from '~/types';

type UsePostTabShortcutsProps = {
  setActiveTab: (tab: PostListTab) => void;
};

export function usePostTabShortcuts({
  setActiveTab,
}: UsePostTabShortcutsProps) {
  // Tab shortcuts using G + key combinations from centralized config
  const pendingShortcut = getShortcut(ShortcutAction.GO_TO_PENDING);
  const pendingKeys = pendingShortcut.keys as Array<string>;

  useHotkeys(`${pendingKeys[0]}>${pendingKeys[1]}`, () => setActiveTab('PENDING'), {
    description: pendingShortcut.description,
    scopes: ['post-list'],
  });

  const repliedShortcut = getShortcut(ShortcutAction.GO_TO_REPLIED);
  const repliedKeys = repliedShortcut.keys as Array<string>;

  useHotkeys(`${repliedKeys[0]}>${repliedKeys[1]}`, () => setActiveTab('REPLIED'), {
    description: repliedShortcut.description,
    scopes: ['post-list'],
  });

  const irrelevantShortcut = getShortcut(ShortcutAction.GO_TO_IRRELEVANT);
  const irrelevantKeys = irrelevantShortcut.keys as Array<string>;

  useHotkeys(`${irrelevantKeys[0]}>${irrelevantKeys[1]}`, () => setActiveTab('IRRELEVANT'), {
    description: irrelevantShortcut.description,
    scopes: ['post-list'],
  });

  const allShortcut = getShortcut(ShortcutAction.GO_TO_ALL);
  const allKeys = allShortcut.keys as Array<string>;

  useHotkeys(`${allKeys[0]}>${allKeys[1]}`, () => setActiveTab('ALL'), {
    description: allShortcut.description,
    scopes: ['post-list'],
  });
};
