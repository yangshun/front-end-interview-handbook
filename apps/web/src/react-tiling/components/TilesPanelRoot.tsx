import clsx from 'clsx';
import type { CSSProperties, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import type { PanelGroupProps } from 'react-resizable-panels';

import { useDragHighlightContext } from '../state/useDragHighlightContext';
import { useTilesContext } from '../state/useTilesContext';
import TilesPanel from './TilesPanel';

export type Props<TabType> = Readonly<{
  disablePointerEventsDuringResize?: boolean;
  getResizeHandlerProps: (direction: PanelGroupProps['direction']) => Readonly<{
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
  }>;
  getTabLabel: (tabId: TabType) => Readonly<{
    icon?: (iconProps: React.ComponentProps<'svg'>) => JSX.Element;
    iconSecondary?: (iconProps: React.ComponentProps<'svg'>) => JSX.Element;
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
    <div ref={setParent} className="size-full relative isolate">
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
            'absolute z-10',
            ['border', 'dark:border-brand border-neutral-300'],
            'dark:bg-brand-darker/20 bg-neutral-200/20',
            draggedItemId === null && 'opacity-0',
            'rounded-md',
            'pointer-events-none',
            'transition-all',
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
