import '!./styles/output.css';

import { render } from '@create-figma-plugin/ui';
import { emit, on } from '@create-figma-plugin/utilities';
import clsx from 'clsx';
import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import { EmptyState } from './components/EmptyState';
import { NodeProperties } from './components/NodeProperties';
import { useWindowResizeImpl } from './hooks/useWindowResizeImpl';
import type { GFESceneNode } from './nodes/types';
import type { SelectionChangedHandler, UIReadyHandler } from './utils/types';

function Plugin() {
  const [loading, setIsLoading] = useState(true);
  const [selectedNode, setSelectedNode] = useState<GFESceneNode | null>(null);

  useEffect(() => {
    on<SelectionChangedHandler>('SELECTION_CHANGED', (node) => {
      setIsLoading(false);
      setSelectedNode(node);
    });

    emit<UIReadyHandler>('UI_READY');
  }, []);

  useWindowResizeImpl();

  return (
    <div className={clsx('antialiased', 'flex flex-col', 'size-full')}>
      <div className="h-0 grow overflow-y-auto">
        {loading ? null : selectedNode == null ? (
          <EmptyState />
        ) : (
          <NodeProperties node={selectedNode} />
        )}
      </div>
      {/* The bar is primarily here so that the main contents scrollbar
      isn't a document level one so that the scrollbars will be within
      the document and resizing area is more natural. */}
      <div
        className={clsx(
          'py-1 px-3 bg-indigo-50 dark:bg-neutral-800',
          'border-t border-neutral-200 dark:border-neutral-700',
          'select-text',
        )}>
        A plugin by{' '}
        <a
          className="underline"
          target="_blank"
          href="https://www.greatfrontend.com">
          GreatFrontEnd
        </a>{' '}
        built for{' '}
        <a
          className="underline"
          target="_blank"
          href="https://www.greatfrontend.com/projects">
          GreatFrontEnd Projects
        </a>
      </div>
    </div>
  );
}

export default render(Plugin);
