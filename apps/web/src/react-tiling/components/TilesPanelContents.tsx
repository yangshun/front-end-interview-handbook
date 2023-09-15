import clsx from 'clsx';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { RiAddLine, RiCloseLine } from 'react-icons/ri';
import { VscSplitHorizontal, VscSplitVertical } from 'react-icons/vsc';
import { Panel } from 'react-resizable-panels';

import {
  themeBackgroundLayerColor,
  themeDivideColor,
  themeIconColor,
} from '~/components/ui/theme';

import type { PanelDropTarget } from '../actions/tabDrop';
import type {
  TilesPanelDropAreaSection,
  TilesPanelGroupDirection,
  TilesPanelItemTab,
} from '../types';

function TabButton({
  onClick,
  onMouseDown,
  ...props
}: React.HtmlHTMLAttributes<HTMLButtonElement>) {
  const buttonElRef = useRef<HTMLButtonElement>(null);
  const [isLocked, setIsLocked] = useState(false);

  const enableButton = useCallback(() => {
    setIsLocked(false);
  }, []);

  useEffect(() => {
    const divElement = buttonElRef.current!;
    const targetDocument = divElement.ownerDocument;

    targetDocument.body.addEventListener('contextmenu', enableButton);
    targetDocument.body.addEventListener('mouseleave', enableButton);
    window.addEventListener('mouseup', enableButton);
    window.addEventListener('touchend', enableButton);

    return () => {
      targetDocument.body.removeEventListener('contextmenu', enableButton);
      targetDocument.body.removeEventListener('mousemove', enableButton);
      targetDocument.body.removeEventListener('touchmove', enableButton);
      targetDocument.body.removeEventListener('mouseleave', enableButton);
      window.removeEventListener('mouseup', enableButton);
      window.removeEventListener('touchend', enableButton);
    };
  }, [enableButton]);

  return (
    <button
      ref={buttonElRef}
      type="button"
      onClick={(event) => {
        if (isLocked) {
          return;
        }
        onClick?.(event);
      }}
      onMouseDown={(event) => {
        // Mouse down is used to make the tab immediately active
        // as opposed to use onClick because we want it to fire when dragging.
        onMouseDown?.(event);
        // Both onMouseDown and onClick fires when the user is just clicking it,
        // so we need to lock the button to prevent onClick from firing.
        setIsLocked(true);
        // The button is unlocked after the interaction.
      }}
      {...props}
    />
  );
}

type DragItem = Readonly<{
  index: number;
  panelId: string;
  tabCloseable: boolean;
  tabId: string;
  type: string;
}>;

function TilePanelTab({
  closeable,
  tabId,
  index,
  isActive,
  label,
  panelId,
  onClick,
  onClose,
  onDrop,
}: Readonly<{
  closeable: boolean;
  index: number;
  isActive: boolean;
  label: string;
  onClick: () => void;
  onClose: () => void;
  onDrop: (
    src: Readonly<{ panelId: string; tabCloseable: boolean; tabId: string }>,
    dst: Readonly<{ panelId: string; tabId: string }>,
  ) => void;
  panelId: string;
  tabId: string;
}>) {
  const tabRef = useRef<HTMLDivElement>(null);
  const [{ isOver }, drop] = useDrop<DragItem, void, { isOver: boolean }>({
    accept: 'tab',
    collect(monitor) {
      return {
        isOver: monitor.isOver(),
      };
    },
    drop(item) {
      if (!tabRef.current) {
        return;
      }

      const { panelId: srcPanelId, tabId: srcTabId } = item;

      // Don't replace items with themselves.
      if (panelId === srcPanelId && tabId === srcTabId) {
        return;
      }

      onDrop(item, { panelId, tabId });
    },
  });
  const [{ isDragging }, drag] = useDrag<
    DragItem,
    unknown,
    { isDragging: boolean }
  >({
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
    item: () => {
      return { index, panelId, tabCloseable: closeable, tabId, type: 'tab' };
    },
    type: 'tab',
  });

  drag(drop(tabRef));

  useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        // If the tab is active, scroll it into view
        tabRef.current?.scrollIntoView({ behavior: 'smooth' });
        // Add a small delay otherwise it doesn't scroll into view :/
      }, 50);
    }
  }, [isActive]);

  return (
    <div
      ref={tabRef}
      className={clsx(
        'group relative isolate flex grow items-center gap-x-0.5 rounded font-medium',
        isOver ? 'bg-neutral-800' : 'bg-neutral-900 hover:bg-neutral-800',
        isActive ? 'text-neutral-50' : 'text-neutral-400',
        closeable ? 'pl-2 pr-1' : 'px-2',
      )}>
      <TabButton
        className={clsx('whitespace-nowrap text-xs', isDragging && 'invisible')}
        onClick={onClick}
        onMouseDown={onClick}>
        <span aria-hidden={true} className="absolute inset-0" />
        {label}
      </TabButton>
      {closeable && (
        <button
          className={clsx(
            'z-20 ml-1 rounded p-0.5 hover:bg-neutral-700',
            isDragging && 'invisible',
            !isActive && 'opacity-0 focus:opacity-100 group-hover:opacity-100',
          )}
          title="Close tab"
          type="button"
          onClick={onClose}>
          <RiCloseLine className="h-3 w-3 shrink-0 text-neutral-500" />
        </button>
      )}
    </div>
  );
}

function TilesPanelTabsSection({
  activeTabId,
  tabs,
  panelId,
  onTabDrop,
  onTabSetActive,
  onTabClose,
  getTabLabel,
}: Readonly<{
  activeTabId: string | null;
  getTabLabel: (tabId: string) => string;
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
  const [{ isOver }, drop] = useDrop<DragItem, void, { isOver: boolean }>({
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

          return (
            <div key={key} className={clsx('flex h-full flex-col')}>
              <TilePanelTab
                closeable={tabItem.closeable}
                index={index}
                isActive={isActive}
                label={getTabLabel(tabItem.id)}
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

function TilesPanelBody({
  children,
  panelId,
  tabs,
  onTabDrop,
}: Readonly<{
  children: React.ReactNode;
  onTabDrop: (
    dropAreaSection: TilesPanelBodyDropAreaSection,
    src: Readonly<{
      panelId: string;
      tabCloseable: boolean;
      tabId: string;
    }>,
  ) => void;
  panelId: string;
  tabs: ReadonlyArray<TilesPanelItemTab>;
}>) {
  const [dropAreaSection, setDropAreaSection] =
    useState<TilesPanelBodyDropAreaSection>('center');
  const tabPanelBodyRef = useRef<HTMLDivElement>(null);
  const [{ isOver, canDrop }, drop] = useDrop<
    DragItem,
    void,
    { canDrop: boolean; isOver: boolean }
  >({
    accept: 'tab',
    canDrop: (item) =>
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
    <div ref={tabPanelBodyRef} className="relative grow">
      {isOver && (
        <div
          className={clsx(
            'absolute inset-0 z-10 bg-indigo-500 opacity-20',
            'origin-top-left transition-transform',
            dropAreaSectionClasses[dropAreaSection],
          )}
        />
      )}
      <div className={clsx(canDrop && 'pointer-events-none')}>{children}</div>
    </div>
  );
}

export default function TilesPanelContents({
  id: panelId,
  defaultSize = 100,
  tabs,
  order,
  getTabLabel,
  renderTab,
  activeTabId,
  onAddTab,
  onClose,
  onTabClose,
  onTabDrop,
  onSplit,
  onTabSetActive,
}: Readonly<{
  activeTabId: string | null;
  defaultSize?: number;
  getTabLabel: (tabId: string) => string;
  id: string;
  onAddTab: (panelIdParam: string) => void;
  onClose: (panelIdParam: string) => void;
  onSplit: (direction: TilesPanelGroupDirection, panelIdParam: string) => void;
  onTabClose: (panelIdParam: string, tabId: string) => void;
  onTabDrop: (
    src: Readonly<{ panelId: string; tabCloseable: boolean; tabId: string }>,
    dst: PanelDropTarget,
  ) => void;
  onTabSetActive: (panelIdParam: string, tabId: string) => void;
  order?: number;
  renderTab: (tabId: string) => JSX.Element;
  tabs: ReadonlyArray<TilesPanelItemTab>;
}>) {
  return (
    <Panel
      className={clsx('flex flex-col rounded-lg', themeBackgroundLayerColor, [
        'divide-y',
        themeDivideColor,
      ])}
      defaultSize={defaultSize}
      id={panelId}
      order={order}>
      <div className="flex h-10 shrink-0 items-center justify-between">
        <span className="flex h-full items-center px-2">
          <button
            className="rounded p-1 hover:bg-neutral-800"
            title="New tab"
            type="button"
            onClick={() => {
              onAddTab(panelId);
            }}>
            <RiAddLine className="h-4 w-4 shrink-0 text-neutral-500" />
          </button>
        </span>
        <TilesPanelTabsSection
          activeTabId={activeTabId}
          getTabLabel={getTabLabel}
          panelId={panelId}
          tabs={tabs}
          onTabClose={(tabId: string) => {
            onTabClose(panelId, tabId);
          }}
          onTabDrop={onTabDrop}
          onTabSetActive={(tabId: string) => {
            onTabSetActive(panelId, tabId);
          }}
        />
        <div className="flex h-full items-center gap-x-1 px-2">
          <button
            className="rounded p-0.5 hover:bg-neutral-800"
            title="Split editor right"
            type="button"
            onClick={() => onSplit('horizontal', panelId)}>
            <VscSplitHorizontal
              className={clsx('h-4 w-4 shrink-0', themeIconColor)}
            />
          </button>
          {tabs.every((tab) => tab.closeable) && (
            <button
              className="rounded p-0.5 hover:bg-neutral-800"
              title="Close all"
              type="button"
              onClick={() => onClose(panelId)}>
              <RiCloseLine
                className={clsx('h-4 w-4 shrink-0', themeIconColor)}
              />
            </button>
          )}
        </div>
      </div>
      <TilesPanelBody
        panelId={panelId}
        tabs={tabs}
        onTabDrop={(dropAreaSection, src) => {
          onTabDrop(src, {
            dropAreaSection,
            panelId,
          });
        }}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={clsx(
              'absolute inset-0 flex',
              !tab.allowOverflow && 'overflow-y-auto',
              tab.id !== activeTabId && 'hidden',
            )}
            role="tabpanel">
            {renderTab(tab.id)}
          </div>
        ))}
      </TilesPanelBody>
    </Panel>
  );
}
