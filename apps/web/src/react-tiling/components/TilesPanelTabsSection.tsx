import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import ScrollArea from '~/components/ui/ScrollArea';

import { useDragHighlightContext } from '../state/useDragHighlightContext';
import { useTilesContext } from '../state/useTilesContext';
import type {
  TilesPanelDragItem,
  TilesPanelDragPanel,
  TilesPanelItemTab,
} from '../types';
import getDragId from '../utils/getDragId';
import isDragTab from '../utils/isDragTab';
import TilesPanelTab from './TilesPanelTab';

type Props<TabType> = Readonly<{
  activeTabId: TabType | null;
  collapsed: boolean;
  getTabLabel: (tabId: TabType) => Readonly<{
    icon?: (iconProps: React.ComponentProps<'svg'>) => JSX.Element;
    iconSecondary?: (iconProps: React.ComponentProps<'svg'>) => JSX.Element;
    label: string;
  }>;
  panelId: string;
  tabs: ReadonlyArray<TilesPanelItemTab<TabType>>;
}>;

export default function TilesPanelTabsSection<TabType extends string>({
  activeTabId,
  tabs,
  panelId,
  collapsed,
  getTabLabel,
}: Props<TabType>) {
  const mode = collapsed ? 'readonly' : 'interactive';
  const { dispatch } = useTilesContext();
  const { parentRect, setPosition, draggedItemId, setDraggedItemId } =
    useDragHighlightContext();
  const tabListRef = useRef<HTMLDivElement>(null);
  const tabRightEmptySpaceRef = useRef<HTMLDivElement>(null);
  const [{ isOver }, drop] = useDrop<
    TilesPanelDragItem<TabType> | TilesPanelDragPanel,
    void,
    { isOver: boolean }
  >({
    accept: ['panel', 'tab'],
    canDrop(item) {
      if (isDragTab(item)) {
        // Item to be dropped is already at the last position
        // in the same panel, it cannot be dropped.
        return !(
          item != null &&
          item.panelId === panelId &&
          tabs[tabs.length - 1]?.id === item.tabId
        );
      }

      // Panel can only be dropped if it's not the same panel.
      return panelId !== item.panelId;
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

      if (isDragTab(item)) {
        if (item.panelId === panelId) {
          const lastTab = tabs[tabs.length - 1];

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
      } else {
        dispatch({
          payload: {
            dst: {
              dropAreaSection: 'tabs-row',
              panelId,
            },
            srcPanelId: item.panelId,
          },
          type: 'panel-drop',
        });
      }
    },
  });

  const [{ isDragging }, drag, dragPreview] = useDrag<
    TilesPanelDragPanel,
    unknown,
    { isDragging: boolean }
  >({
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
    end: (draggedItem) => {
      if (draggedItem.panelId === panelId) {
        setDraggedItemId(null);
        setPosition(null);
      }
    },
    item: () => {
      return { panelId };
    },
    type: 'panel',
  });

  useEffect(() => {
    // This useEffect hides the default preview
    dragPreview(getEmptyImage(), { captureDraggingState: true });
  }, [dragPreview]);

  useEffect(() => {
    if (isDragging && draggedItemId !== panelId) {
      setDraggedItemId(panelId);
    }
  }, [draggedItemId, isDragging, panelId, setDraggedItemId]);

  useEffect(() => {
    const dragId = getDragId({
      panelId,
    });

    if (isOver && dragId !== draggedItemId) {
      const emptySpaceRect =
        tabRightEmptySpaceRef.current?.getBoundingClientRect();

      if (!emptySpaceRect || !parentRect) {
        return;
      }

      const { height, width } = emptySpaceRect;

      // Add py-1.5 (6px of vertical padding)
      setPosition({
        height: height - 12,
        left: emptySpaceRect.left - parentRect.left,
        top: emptySpaceRect.top - parentRect.top + 6,
        width,
      });
    }
  }, [draggedItemId, isOver, panelId, parentRect, setPosition]);

  drag(drop(tabRightEmptySpaceRef));

  return (
    <div
      className="flex h-full grow overflow-x-auto"
      onWheel={(event) => {
        if (!event.deltaY || !tabListRef.current) {
          return;
        }

        tabListRef.current.scrollLeft += event.deltaY + event.deltaX;
      }}>
      <ScrollArea
        ref={tabListRef}
        scrollbars="horizontal"
        size="thin"
        viewportClass="flex items-center"
        widthClass="w-fit">
        <div className="size-full flex gap-x-2 overflow-y-hidden py-1.5">
          {tabs.map((tabItem, index) => {
            const isActive =
              mode === 'interactive' && activeTabId === tabItem.id;
            const key = String(tabItem.id) + ' ' + String(index);
            const { icon, label, iconSecondary } = getTabLabel(tabItem.id);

            return (
              <div key={key} className={clsx('flex h-8 flex-col')}>
                <TilesPanelTab
                  closeable={tabItem.closeable}
                  href={tabItem.href}
                  icon={icon}
                  iconSecondary={iconSecondary}
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
                  onPanelDrop={(src, dst) => {
                    dispatch({
                      payload: {
                        dst: {
                          dropAreaSection: 'tab',
                          ...dst,
                        },
                        srcPanelId: src.panelId,
                      },
                      type: 'panel-drop',
                    });
                  }}
                  onTabDrop={(src, dst) => {
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
      </ScrollArea>
      <div
        ref={tabRightEmptySpaceRef}
        className="h-full grow hover:cursor-pointer"
        onDoubleClick={() => {
          dispatch({
            payload: {
              collapsed: !collapsed,
              panelId,
            },
            type: 'panel-collapse',
          });
        }}
      />
    </div>
  );
}
