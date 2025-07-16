'use client';

import { useHotkeys } from 'react-hotkeys-hook';

import type { PostListTab } from '~/types';

type UsePostTabShortcutsProps = {
  setActiveTab: (tab: PostListTab) => void;
};

export function usePostTabShortcuts({
  setActiveTab,
}: UsePostTabShortcutsProps) {
  // Tab shortcuts using G + key combinations
  useHotkeys('g>1', () => setActiveTab('PENDING'), {
    description: 'Switch to Pending tab',
    scopes: ['post-list'],
  });

  useHotkeys('g>2', () => setActiveTab('REPLIED'), {
    description: 'Switch to Replied tab',
    scopes: ['post-list'],
  });

  useHotkeys('g>3', () => setActiveTab('IRRELEVANT'), {
    description: 'Switch to Irrelevant tab',
    scopes: ['post-list'],
  });

  useHotkeys('g>4', () => setActiveTab('ALL'), {
    description: 'Switch to All tab',
    scopes: ['post-list'],
  });
}
