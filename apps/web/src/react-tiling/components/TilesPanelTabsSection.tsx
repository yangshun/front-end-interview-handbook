import clsx from 'clsx';
import { useRef } from 'react';
import { useDrop } from 'react-dnd';

import TilesPanelTab from './TilesPanelTab';
import { useTilesContext } from '../state/useTilesContext';
import type { TilesPanelDragItem, TilesPanelItemTab } from '../types';

type Props = Readonly<{
  activeTabId: string | null;
  getTabLabel: (tabId: string) => Readonly<{
    icon: (iconProps: React.ComponentProps<'svg'>) => JSX.Element;
    label: string;
  }>;
  mode?: 'interactive' | 'readonly';
  panelId: string;
  tabs: ReadonlyArray<TilesPanelItemTab>;
}>;

export default function TilesPanelTabsSection({
  activeTabId,
  tabs,
  panelId,
  mode = 'interactive',
  getTabLabel,
}: Props) {
  const { dispatch } = useTilesContext();
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

      dispatch({
        payload: {
          dst: {
            dropAreaSection: 'tabs-row',
            panelId,
          },
          src: item,
        },
        type: 'tab-drop',
      });
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
          const isActive = mode === 'interactive' && activeTabId === tabItem.id;
          const key = String(tabItem.id) + ' ' + String(index);
          const { icon, label } = getTabLabel(tabItem.id);

          return (
            <div key={key} className={clsx('flex h-full flex-col')}>
              <TilesPanelTab
                closeable={tabItem.closeable}
                href={tabItem.href}
                icon={icon}
                index={index}
                isActive={isActive}
                label={label}
                panelId={panelId}
                tabId={tabItem.id}
                onClick={() => {
                  dispatch({
                    payload: {
                      panelId,
                      tabId: tabItem.id,
                    },
                    type: 'tab-set-active',
                  });
                }}
                onDrop={(src, dst) => {
                  dispatch({
                    payload: {
                      dst: {
                        dropAreaSection: 'tab',
                        ...dst,
                      },
                      src,
                    },
                    type: 'tab-drop',
                  });
                }}
              />
            </div>
          );
        })}
      </div>
      <div
        ref={tabRightEmptySpaceRef}
        className={clsx(
          'h-full grow',
          isOver && 'bg-brand-lightest dark:bg-neutral-800',
        )}
      />
    </div>
  );
}
