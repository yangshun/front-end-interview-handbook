import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';

import type { Position } from '../state/DragHighlightContext';
import { useDragHighlightContext } from '../state/useDragHighlightContext';
import type {
  TilesPanelDragItem,
  TilesPanelDragPanel,
  TilesPanelDropAreaSection,
  TilesPanelItemTab,
} from '../types';
import isDragTab from '../utils/isDragTab';

const DROP_AREA_PART_THRESHOLD = 0.2;

type TilesPanelBodyDropAreaSection = Exclude<
  TilesPanelDropAreaSection,
  'tab' | 'tabs-row'
>;

type Props<TabType> = Readonly<{
  allowDropping?: boolean;
  children: React.ReactNode;
  hidden?: boolean;
  onPanelDrop: (
    dropAreaSection: TilesPanelBodyDropAreaSection,
    src: Readonly<{
      panelId: string;
    }>,
  ) => void;
  onTabDrop: (
    dropAreaSection: TilesPanelBodyDropAreaSection,
    src: Readonly<{
      panelId: string;
      tabCloseable: boolean;
      tabId: TabType;
    }>,
  ) => void;
  panelId: string;
  tabs: ReadonlyArray<TilesPanelItemTab<TabType>>;
}>;

export default function TilesPanelBody<TabType>({
  allowDropping = true,
  children,
  hidden = false,
  onPanelDrop,
  onTabDrop,
  panelId,
  tabs,
}: Props<TabType>) {
  const { parentRect, position, setPosition } = useDragHighlightContext();
  const [dropAreaSection, setDropAreaSection] =
    useState<TilesPanelBodyDropAreaSection>('center');
  const tabPanelBodyRef = useRef<HTMLDivElement>(null);
  const [{ canDrop, isOver }, drop] = useDrop<
    TilesPanelDragItem<TabType> | TilesPanelDragPanel,
    void,
    { canDrop: boolean; isOver: boolean }
  >({
    accept: ['panel', 'tab'],
    canDrop: (item) => {
      if (isDragTab(item)) {
        return (
          allowDropping &&
          !(item != null && item.panelId === panelId && tabs.length === 1)
        );
      }

      return allowDropping && panelId !== item.panelId;
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.canDrop() && monitor.isOver(),
    }),
    drop(item) {
      if (!tabPanelBodyRef.current) {
        return;
      }

      if (isDragTab(item)) {
        onTabDrop(dropAreaSection, item);
      } else {
        onPanelDrop(dropAreaSection, item);
      }
    },
    hover(_item, monitor) {
      // Determine rectangle on screen.
      const hoverBoundingRect =
        tabPanelBodyRef.current?.getBoundingClientRect();
      // Determine mouse position.
      const clientOffset = monitor.getClientOffset();

      if (clientOffset == null || hoverBoundingRect == null) {
        return;
      }

      const hoverClientX = clientOffset.x - hoverBoundingRect.left;
      const hoverClientPercentageX = hoverClientX / hoverBoundingRect.width;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      const hoverClientPercentageY = hoverClientY / hoverBoundingRect.height;

      const dropAreaSectionValue = (() => {
        if (hoverClientPercentageX <= DROP_AREA_PART_THRESHOLD) {
          return 'left';
        }
        if (hoverClientPercentageX >= 1 - DROP_AREA_PART_THRESHOLD) {
          return 'right';
        }
        if (hoverClientPercentageY <= DROP_AREA_PART_THRESHOLD) {
          return 'top';
        }
        if (hoverClientPercentageY >= 1 - DROP_AREA_PART_THRESHOLD) {
          return 'bottom';
        }

        return 'center';
      })() satisfies TilesPanelBodyDropAreaSection;

      setDropAreaSection(dropAreaSectionValue);
    },
  });

  useEffect(() => {
    if (!isOver) {
      return;
    }

    const hoverBoundingRect = tabPanelBodyRef.current?.getBoundingClientRect();

    function getPosition(): Position | null {
      if (parentRect == null || hoverBoundingRect == null) {
        return null;
      }

      const top = hoverBoundingRect.top - parentRect.top;
      const left = hoverBoundingRect.left - parentRect.left;
      const { height, width } = hoverBoundingRect;

      switch (dropAreaSection) {
        case 'center':
          return {
            height,
            left,
            top,
            width,
          };
        case 'top':
          return {
            height: height / 2,
            left,
            top,
            width,
          };
        case 'bottom':
          return {
            height: height / 2,
            left,
            top: top + height / 2,
            width,
          };
        case 'right':
          return {
            height,
            left: left + width / 2,
            top,
            width: width / 2,
          };
        case 'left':
          return {
            height,
            left,
            top,
            width: width / 2,
          };
      }
    }

    const newPosition = getPosition();

    setPosition(newPosition);
  }, [dropAreaSection, parentRect, position, setPosition, isOver]);

  drop(tabPanelBodyRef);

  return (
    <div
      ref={tabPanelBodyRef}
      className={clsx('relative grow', hidden && 'hidden')}>
      <div className={clsx(canDrop && 'pointer-events-none')}>{children}</div>
    </div>
  );
}
