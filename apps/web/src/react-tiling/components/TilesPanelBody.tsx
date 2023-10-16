import clsx from 'clsx';
import { useRef, useState } from 'react';
import { useDrop } from 'react-dnd';

import type {
  TilesPanelDragItem,
  TilesPanelDropAreaSection,
  TilesPanelItemTab,
} from '../types';

const DROP_AREA_PART_THRESHOLD = 0.2;

type TilesPanelBodyDropAreaSection = Exclude<
  TilesPanelDropAreaSection,
  'tab' | 'tabs-row'
>;

const dropAreaSectionClasses: Record<TilesPanelBodyDropAreaSection, string> = {
  bottom: 'translate-y-1/2 scale-y-50',
  center: '',
  left: 'scale-x-50',
  right: 'translate-x-1/2 scale-x-50',
  top: 'scale-y-50',
};

type Props<TabType> = Readonly<{
  allowDropping?: boolean;
  children: React.ReactNode;
  hidden?: boolean;
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
  panelId,
  tabs,
  onTabDrop,
}: Props<TabType>) {
  const [dropAreaSection, setDropAreaSection] =
    useState<TilesPanelBodyDropAreaSection>('center');
  const tabPanelBodyRef = useRef<HTMLDivElement>(null);
  const [{ isOver, canDrop }, drop] = useDrop<
    TilesPanelDragItem<TabType>,
    void,
    { canDrop: boolean; isOver: boolean }
  >({
    accept: 'tab',
    canDrop: (item) =>
      allowDropping &&
      !(item != null && item.panelId === panelId && tabs.length === 1),
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.canDrop() && monitor.isOver(),
    }),
    drop(item) {
      if (!tabPanelBodyRef.current) {
        return;
      }

      onTabDrop(dropAreaSection, item);
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

      const dropAreaSectionValue: TilesPanelDropAreaSection = (() => {
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
      })();

      setDropAreaSection(dropAreaSectionValue);
    },
  });

  drop(tabPanelBodyRef);

  return (
    <div
      ref={tabPanelBodyRef}
      className={clsx('relative grow', hidden && 'hidden')}>
      {isOver && (
        <div
          className={clsx(
            'bg-brand-darker absolute inset-0 z-10 opacity-20',
            'origin-top-left transition-transform',
            dropAreaSectionClasses[dropAreaSection],
          )}
        />
      )}
      <div className={clsx(canDrop && 'pointer-events-none')}>{children}</div>
    </div>
  );
}