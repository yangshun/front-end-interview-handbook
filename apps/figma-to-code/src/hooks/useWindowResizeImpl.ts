import { useWindowResize } from '@create-figma-plugin/ui';
import { emit } from '@create-figma-plugin/utilities';

import { heightConfig, widthConfig } from '../utils/constants';
import type { ResizeWindowHandler } from '../utils/types';

function onWindowResize(windowSize: { height: number; width: number }) {
  emit<ResizeWindowHandler>('RESIZE_WINDOW', windowSize);
}

export function useWindowResizeImpl() {
  useWindowResize(onWindowResize, {
    maxHeight: heightConfig.max,
    maxWidth: widthConfig.max,
    minHeight: heightConfig.min,
    minWidth: widthConfig.min,
    resizeBehaviorOnDoubleClick: 'minimize',
  });
}
