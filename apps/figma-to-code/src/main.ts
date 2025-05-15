import { emit, on, once, showUI } from '@create-figma-plugin/utilities';

import { convertFigmaNodeToGFENode } from './nodes/convertFigmaNodeToGFENode';
import { heightConfig, widthConfig } from './utils/constants';
import type {
  CloseUIHandler,
  CopyHandler,
  ResizeWindowHandler,
  SelectionChangedHandler,
  UIReadyHandler,
} from './utils/types';

export default function main() {
  on<ResizeWindowHandler>(
    'RESIZE_WINDOW',
    (windowSize: { height: number; width: number }) => {
      const { width, height } = windowSize;

      figma.ui.resize(width, height);
    },
  );
  once<UIReadyHandler>('UI_READY', () => {
    setSelectedNode();
  });
  once<CloseUIHandler>('CLOSE_UI', () => {
    figma.closePlugin();
  });
  on<CopyHandler>('COPY_TO_CLIPBOARD', (copySuccess) => {
    figma.notify(
      copySuccess
        ? 'Copied to clipboard'
        : 'Failed to copy. Try using the Figma desktop app or a Chrome browser',
      {
        error: !copySuccess,
      },
    );
  });

  let currentPageNode: PageNode | null = null;

  function setSelectedNode() {
    if (figma.currentPage.selection.length !== 1) {
      emit<SelectionChangedHandler>('SELECTION_CHANGED', null);

      return;
    }

    const node = figma.currentPage.selection[0];
    const serializedNode = convertFigmaNodeToGFENode(node);

    emit<SelectionChangedHandler>('SELECTION_CHANGED', serializedNode);
  }

  function onNodeChange() {
    setSelectedNode();
  }

  figma.on('selectionchange', () => {
    setSelectedNode();

    if (currentPageNode?.id === figma.currentPage.id) {
      return;
    }

    currentPageNode?.off('nodechange', onNodeChange);
    currentPageNode = figma.currentPage;
    currentPageNode.on('nodechange', onNodeChange);
  });

  showUI({
    height: heightConfig.default,
    width: widthConfig.default,
  });
}
