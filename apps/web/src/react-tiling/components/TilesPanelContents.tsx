import {
  TilesPanelDropAreaSection,
  TilesPanelGroupDirection,
  TilesPanelItemTab,
} from '../types';
import { Panel } from 'react-resizable-panels';
import { RiAddLine, RiCloseLine } from 'react-icons/ri';
import { VscSplitHorizontal, VscSplitVertical } from 'react-icons/vsc';
import clsx from 'clsx';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { PanelDropTarget } from '../actions/tabDrop';

function TabButton({
  onClick,
  onMouseDown,
  onMouseUp,
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
      onMouseDown={(event) => {
        // Mouse down is used to make the tab immediately active
        // as opposed to use onClick because we want it to fire when dragging.
        onMouseDown?.(event);
        // Both onMouseDown and onClick fires when the user is just clicking it,
        // so we need to lock the button to prevent onClick from firing.
        setIsLocked(true);
        // The button is unlocked after the interaction.
      }}
      onClick={(event) => {
        if (isLocked) {
          return;
        }
        onClick?.(event);
      }}
      {...props}
    />
  );
}

type DragItem = Readonly<{
  index: number;
  tabId: string;
  panelId: string;
  type: string;
  tabCloseable: boolean;
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
  tabId: string;
  index: number;
  isActive: boolean;
  panelId: string;
  label: string;
  onClick: () => void;
  onClose: () => void;
  onDrop: (
    src: Readonly<{ panelId: string; tabId: string; tabCloseable: boolean }>,
    dst: Readonly<{ panelId: string; tabId: string }>,
  ) => void;
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
    type: 'tab',
    item: () => {
      return { tabId, index, type: 'tab', panelId, tabCloseable: closeable };
    },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
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
        'group grow flex items-center relative gap-x-0.5 isolate rounded',
        isOver ? 'bg-neutral-800' : 'bg-neutral-900 hover:bg-neutral-800',
        isActive ? 'text-neutral-100' : 'text-neutral-400',
        closeable ? 'pl-2 pr-1' : 'px-2',
      )}>
      <TabButton
        className={clsx('text-xs whitespace-nowrap', isDragging && 'invisible')}
        onClick={onClick}
        onMouseDown={onClick}>
        <span aria-hidden={true} className="absolute inset-0" />
        {label}
      </TabButton>
      {closeable && (
        <button
          title="Close tab"
          className={clsx(
            'ml-1 rounded p-0.5 hover:bg-neutral-700 z-20',
            isDragging && 'invisible',
            !isActive && 'opacity-0 group-hover:opacity-100 focus:opacity-100',
          )}
          onClick={onClose}>
          <RiCloseLine className="h-3 w-3 text-neutral-500 shrink-0" />
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
  panelId: string;
  tabs: ReadonlyArray<TilesPanelItemTab>;
  onTabDrop: (
    src: Readonly<{ panelId: string; tabId: string; tabCloseable: boolean }>,
    dst: PanelDropTarget,
  ) => void;
  onTabSetActive: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
  getTabLabel: (tabId: string) => string;
}>) {
  const tabListRef = useRef<HTMLDivElement>(null);
  const tabRightEmptySpaceRef = useRef<HTMLDivElement>(null);
  const [{ isOver }, drop] = useDrop<DragItem, void, { isOver: boolean }>({
    accept: 'tab',
    collect(monitor) {
      return {
        isOver: monitor.canDrop() && !!monitor.isOver(),
      };
    },
    canDrop(item) {
      // Item to be dropped is already at the last position
      // in the same panel, it cannot be dropped.
      return !(
        item != null &&
        item.panelId === panelId &&
        tabs.at(-1)?.id === item.tabId
      );
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

      onTabDrop(item, { panelId, dropAreaSection: 'tabs-row' });
    },
  });

  drop(tabRightEmptySpaceRef);

  return (
    <div className="flex grow h-full overflow-x-auto">
      <div
        className="flex overflow-x-auto overflow-y-hidden h-full gap-x-2 thin-scrollbar py-1.5"
        ref={tabListRef}
        onWheel={(event) => {
          if (!event.deltaY || !tabListRef.current) {
            return;
          }

          tabListRef.current.scrollLeft += event.deltaY + event.deltaX;
        }}>
        {tabs.map((tabItem, index) => {
          const isActive = activeTabId === tabItem.id;
          const key = tabItem.id + ' ' + index;

          return (
            <div className={clsx('flex h-full flex-col')} key={key}>
              <TilePanelTab
                closeable={tabItem.closeable}
                panelId={panelId}
                tabId={tabItem.id}
                index={index}
                isActive={isActive}
                onClick={() => {
                  onTabSetActive(tabItem.id);
                }}
                onClose={() => {
                  onTabClose(tabItem.id);
                }}
                onDrop={(src, dst) => {
                  onTabDrop(src, { dropAreaSection: 'tab', ...dst });
                }}
                label={getTabLabel(tabItem.id)}
              />
            </div>
          );
        })}
      </div>
      <div
        className={clsx('h-full grow', isOver && 'bg-neutral-800')}
        ref={tabRightEmptySpaceRef}
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
  center: '',
  left: 'scale-x-50',
  right: 'translate-x-1/2 scale-x-50',
  top: 'scale-y-50',
  bottom: 'translate-y-1/2 scale-y-50',
};

function TilesPanelBody({
  children,
  panelId,
  tabs,
  onTabDrop,
}: Readonly<{
  children: React.ReactNode;
  panelId: string;
  tabs: ReadonlyArray<TilesPanelItemTab>;
  onTabDrop: (
    dropAreaSection: TilesPanelBodyDropAreaSection,
    src: Readonly<{
      panelId: string;
      tabId: string;
      tabCloseable: boolean;
    }>,
  ) => void;
}>) {
  const [dropAreaSection, setDropAreaSection] =
    useState<TilesPanelBodyDropAreaSection>('center');
  const tabPanelBodyRef = useRef<HTMLDivElement>(null);
  const [{ isOver, canDrop }, drop] = useDrop<
    DragItem,
    void,
    { isOver: boolean; canDrop: boolean }
  >({
    accept: 'tab',
    collect: (monitor) => ({
      isOver: monitor.canDrop() && monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    canDrop: (item) =>
      !(item != null && item.panelId === panelId && tabs.length === 1),
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
    drop(item) {
      if (!tabPanelBodyRef.current) {
        return;
      }

      onTabDrop(dropAreaSection, item);
    },
  });

  drop(tabPanelBodyRef);
  return (
    <div ref={tabPanelBodyRef} className="grow relative">
      {isOver && (
        <div
          className={clsx(
            'absolute inset-0 bg-indigo-500 opacity-20 z-10',
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
  id: string;
  activeTabId: string | null;
  defaultSize?: number;
  tabs: ReadonlyArray<TilesPanelItemTab>;
  order?: number;
  getTabLabel: (tabId: string) => string;
  renderTab: (tabId: string) => JSX.Element;
  onClose: (panelId: string) => void;
  onAddTab: (panelId: string) => void;
  onTabSetActive: (panelId: string, tabId: string) => void;
  onTabClose: (panelId: string, tabId: string) => void;
  onTabDrop: (
    src: Readonly<{ panelId: string; tabId: string; tabCloseable: boolean }>,
    dst: PanelDropTarget,
  ) => void;
  onSplit: (direction: TilesPanelGroupDirection, panelId: string) => void;
}>) {
  return (
    <Panel
      id={panelId}
      className="flex flex-col bg-neutral-900 rounded-lg divide-y divide-neutral-800/60"
      order={order}
      defaultSize={defaultSize}>
      <div className="h-10 flex justify-between items-center shrink-0">
        <span className="flex h-full items-center px-2">
          <button
            title="New tab"
            className="rounded p-1 hover:bg-neutral-800"
            onClick={() => {
              onAddTab(panelId);
            }}>
            <RiAddLine className="h-4 w-4 text-neutral-500 shrink-0" />
          </button>
        </span>
        <TilesPanelTabsSection
          panelId={panelId}
          activeTabId={activeTabId}
          tabs={tabs}
          onTabDrop={onTabDrop}
          onTabSetActive={(tabId: string) => {
            onTabSetActive(panelId, tabId);
          }}
          onTabClose={(tabId: string) => {
            onTabClose(panelId, tabId);
          }}
          getTabLabel={getTabLabel}
        />
        <div className="flex px-2 gap-x-1 h-full items-center">
          <button
            title="Split horizontal"
            className="rounded p-0.5 hover:bg-neutral-800"
            onClick={() => onSplit('horizontal', panelId)}>
            <VscSplitHorizontal className="h-4 w-4 text-neutral-500" />
          </button>
          <button
            title="Split vertical"
            className="rounded p-0.5 hover:bg-neutral-800"
            onClick={() => onSplit('vertical', panelId)}>
            <VscSplitVertical className="h-4 w-4 text-neutral-500" />
          </button>
          {tabs.every((tab) => tab.closeable) && (
            <button
              className="rounded p-0.5 hover:bg-neutral-800"
              title="Close all"
              onClick={() => onClose(panelId)}>
              <RiCloseLine className="h-4 w-4 text-neutral-500" />
            </button>
          )}
        </div>
      </div>
      <TilesPanelBody
        panelId={panelId}
        tabs={tabs}
        onTabDrop={(dropAreaSection, src) => {
          onTabDrop(src, {
            panelId,
            dropAreaSection,
          });
        }}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            role="tabpanel"
            className={clsx(
              'flex absolute inset-0',
              !tab.allowOverflow && 'overflow-y-auto',
              tab.id !== activeTabId && 'hidden',
            )}>
            {renderTab(tab.id)}
          </div>
        ))}
      </TilesPanelBody>
    </Panel>
  );
}
