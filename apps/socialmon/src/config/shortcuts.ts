/**
 * Centralized keyboard shortcuts configuration
 * This is the single source of truth for all keyboard shortcuts in the application
 */

export enum ShortcutAction {
  // Tab navigation
  GO_TO_ALL = 'GO_TO_ALL',
  GO_TO_IRRELEVANT = 'GO_TO_IRRELEVANT',
  GO_TO_PENDING = 'GO_TO_PENDING',
  GO_TO_REPLIED = 'GO_TO_REPLIED',

  // Post detail actions
  NEXT_POST = 'NEXT_POST',
  OPEN_ON_REDDIT = 'OPEN_ON_REDDIT',
  PREV_POST = 'PREV_POST',
  TOGGLE_RELEVANCE = 'TOGGLE_RELEVANCE',
  TOGGLE_REPLY_STATUS = 'TOGGLE_REPLY_STATUS',
}

export type ShortcutConfig = {
  /** Human-readable description of what the shortcut does */
  description: string;
  /** The key or key combination for the shortcut */
  keys: Array<string> | string;
  /** Scope for react-hotkeys-hook (if applicable) */
  scope?: Array<string> | string;
};

export const SHORTCUTS: Record<ShortcutAction, ShortcutConfig> = {
  [ShortcutAction.GO_TO_ALL]: {
    description: 'Go to all posts',
    keys: ['g', '1'],
  },
  [ShortcutAction.GO_TO_IRRELEVANT]: {
    description: 'Go to irrelevant posts',
    keys: ['g', '3'],
  },
  [ShortcutAction.GO_TO_PENDING]: {
    description: 'Go to pending posts',
    keys: ['g', '4'],
  },
  [ShortcutAction.GO_TO_REPLIED]: {
    description: 'Go to replied posts',
    keys: ['g', '2'],
  },
  [ShortcutAction.NEXT_POST]: {
    description: 'Go to next post',
    keys: 'j',
    scope: 'post-detail',
  },
  [ShortcutAction.OPEN_ON_REDDIT]: {
    description: 'Open post on Reddit',
    keys: 'e',
    scope: 'post-detail',
  },
  [ShortcutAction.PREV_POST]: {
    description: 'Go to previous post',
    keys: 'k',
    scope: 'post-detail',
  },
  [ShortcutAction.TOGGLE_RELEVANCE]: {
    description: 'Toggle post relevance',
    keys: 't',
    scope: 'post-detail',
  },
  [ShortcutAction.TOGGLE_REPLY_STATUS]: {
    description: 'Toggle reply status',
    keys: 'r',
    scope: 'post-detail',
  },
};

/**
 * Get the shortcut configuration for a specific action
 */
export function getShortcut(action: ShortcutAction): ShortcutConfig {
  return SHORTCUTS[action];
}
