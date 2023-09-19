import clsx from 'clsx';
import { useRef } from 'react';
import { useDrop } from 'react-dnd';

import TilesPanelTab from './TilesPanelTab';
import type { PanelDropTarget } from '../actions/tabDrop';
import type { TilesPanelDragItem, TilesPanelItemTab } from '../types';

export default function TilesPanelTabsSection({
  activeTabId,
  tabs,
  panelId,
  onTabDrop,
  onTabSetActive,
  onTabClose,
  getTabLabel,
}: Readonly<{
  activeTabId: string | null;
  getTabLabel: (tabId: string) => Readonly<{
    icon: (iconProps: React.ComponentProps<'svg'>) => JSX.Element;
    label: string;
  }>;
  onTabClose: (tabId: string) => void;
  onTabDrop: (
    src: Readonly<{ panelId: string; tabCloseable: boolean; tabId: string }>,
    dst: PanelDropTarget,
  ) => void;
  onTabSetActive: (tabId: string) => void;
  panelId: string;
  tabs: ReadonlyArray<TilesPanelItemTab>;
}>) {
  const tabListRef = useRef<HTMLDivElement>(null);
  const tabRightEmptySpaceRef = useRef<HTMLDivElement>(null);
  const [{ isOver }, drop] = useDrop<
    TilesPanelDragItem,
    void,
    { isOver: boolean }
  >({
    accept: 'tab',
    canDrop(item) {
      // Item to be dropped is already at the last position
      // in the same panel, it cannot be dropped.
      return !(
        item != null &&
        item.panelId === panelId &&
        tabs.at(-1)?.id === item.tabId
      );
    },
    collect(monitor) {
      return {
        isOver: monitor.canDrop() && !!monitor.isOver(),
      };
    },
    drop(item) {
      if (!tabRightEmptySpaceRef.current) {
        return;
      }

      if (item.panelId === panelId) {
        const lastTab = tabs.at(-1);

        // Item to be dropped is already at the last position
        // in the same panel, nothing to do.
        if (lastTab != null && lastTab.id === item.tabId) {
          return;
        }
      }

      onTabDrop(item, { dropAreaSection: 'tabs-row', panelId });
    },
  });

  drop(tabRightEmptySpaceRef);

  return (
    <div className="flex h-full grow overflow-x-auto">
      <div
        ref={tabListRef}
        className="thin-scrollbar flex h-full gap-x-2 overflow-x-auto overflow-y-hidden py-1.5"
        onWheel={(event) => {
          if (!event.deltaY || !tabListRef.current) {
            return;
          }

          tabListRef.current.scrollLeft += event.deltaY + event.deltaX;
        }}>
        {tabs.map((tabItem, index) => {
          const isActive = activeTabId === tabItem.id;
          const key = String(tabItem.id) + ' ' + String(index);
          const { icon, label } = getTabLabel(tabItem.id);

          return (
            <div key={key} className={clsx('flex h-full flex-col')}>
              <TilesPanelTab
                closeable={tabItem.closeable}
                icon={icon}
                index={index}
                isActive={isActive}
                label={label}
                panelId={panelId}
                tabId={tabItem.id}
                onClick={() => {
                  onTabSetActive(tabItem.id);
                }}
                onClose={() => {
                  onTabClose(tabItem.id);
                }}
                onDrop={(src, dst) => {
                  onTabDrop(src, { dropAreaSection: 'tab', ...dst });
                }}
              />
            </div>
          );
        })}
      </div>
      <div
        ref={tabRightEmptySpaceRef}
        className={clsx('h-full grow', isOver && 'bg-neutral-800')}
      />
    </div>
  );
}
