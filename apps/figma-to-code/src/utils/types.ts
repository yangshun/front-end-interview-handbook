import type { EventHandler } from '@create-figma-plugin/utilities';

import type { GFESceneNode } from '../nodes/types';

export type ResizeWindowHandler = EventHandler & {
  handler: (windowSize: { height: number; width: number }) => void;
  name: 'RESIZE_WINDOW';
};

export type CloseUIHandler = EventHandler & {
  handler: () => void;
  name: 'CLOSE_UI';
};

export type UIReadyHandler = EventHandler & {
  handler: () => void;
  name: 'UI_READY';
};

export type SelectionChangedHandler = EventHandler & {
  handler: (node: GFESceneNode | null) => void;
  name: 'SELECTION_CHANGED';
};

export type CopyHandler = EventHandler & {
  handler: (success: boolean) => void;
  name: 'COPY_TO_CLIPBOARD';
};
