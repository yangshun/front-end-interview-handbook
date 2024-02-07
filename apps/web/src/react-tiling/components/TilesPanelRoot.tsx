import clsx from 'clsx';
import type { CSSProperties, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import type { PanelGroupProps } from 'react-resizable-panels';

import TilesPanel from './TilesPanel';
import { useDragHighlightContext } from '../state/useDragHighlightContext';
import { useTilesContext } from '../state/useTilesContext';

export type Props<TabType> = Readonly<{
  disablePointerEventsDuringResize?: boolean;
  getResizeHandlerProps: (direction: PanelGroupProps['direction']) => Readonly<{
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
  }>;
  getTabLabel: (tabId: TabType) => Readonly<{
    icon?: (iconProps: React.ComponentProps<'svg'>) => JSX.Element;
    label: string;
  }>;
  renderTab: (tabId: TabType) => JSX.Element;
}>;

export function TilesPanelRoot<TabType extends string>({
  disablePointerEventsDuringResize,
  getResizeHandlerProps,
  renderTab,
  getTabLabel,
}: Props<TabType>) {
  const { tiles } = useTilesContext<TabType>();
  const [prevDraggedItemId, setPrevDraggedItemId] = useState<string | null>(
    null,
  );
  const { setParent, position, draggedItemId } = useDragHighlightContext();

  useEffect(() => {
    if (draggedItemId !== null) {
      setPrevDraggedItemId(draggedItemId);
    }
  }, [draggedItemId]);

  return (
    <div ref={setParent} className="relative isolate size-full">
      <TilesPanel
        level={0}
        parentDirection="horizontal"
        {...tiles}
        disablePointerEventsDuringResize={disablePointerEventsDuringResize}
        getResizeHandlerProps={getResizeHandlerProps}
        getTabLabel={getTabLabel}
        renderTab={renderTab}
      />
      {position !== null && (
        // Use prevDraggedItemId as key, so that on first hover,
        // the hover indicator will not animate from the previously hovered item.
        <div
          key={prevDraggedItemId}
          className={clsx(
            'border-brand bg-brand-darker pointer-events-none absolute z-10 rounded-md border bg-opacity-20 transition-all',
            draggedItemId === null && 'opacity-0',
          )}
          style={{
            height: position.height,
            left: position.left,
            top: position.top,
            width: position.width,
          }}
        />
      )}
    </div>
  );
}
