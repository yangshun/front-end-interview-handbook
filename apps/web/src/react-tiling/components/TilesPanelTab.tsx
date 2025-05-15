import clsx from 'clsx';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { RiCloseLine } from 'react-icons/ri';

import {
  themeTextBrandColor_Hover,
  themeTextColor,
  themeTextSubtleColor,
} from '~/components/ui/theme';

import { I18nLink } from '~/next-i18nostic/src';

import { useDragHighlightContext } from '../state/useDragHighlightContext';
import { useTilesContext } from '../state/useTilesContext';
import type { TilesPanelDragItem, TilesPanelDragPanel } from '../types';
import getDragId from '../utils/getDragId';
import isDragTab from '../utils/isDragTab';

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

export default function TilesPanelTab<TabType extends string>({
  closeable,
  href,
  icon: Icon,
  iconSecondary: IconSecondary,
  index,
  isActive,
  label,
  onClick,
  onPanelDrop,
  onTabDrop,
  panelId,
  tabId,
}: Readonly<{
  closeable: boolean;
  href?: string;
  icon?: (iconProps: React.ComponentProps<'svg'>) => JSX.Element;
  iconSecondary?: (iconProps: React.ComponentProps<'svg'>) => JSX.Element;
  index: number;
  isActive: boolean;
  label: string;
  onClick: () => void;
  onPanelDrop: (
    src: Readonly<{ panelId: string }>,
    dst: Readonly<{ panelId: string; tabId: TabType }>,
  ) => void;
  onTabDrop: (
    src: Readonly<{ panelId: string; tabCloseable: boolean; tabId: TabType }>,
    dst: Readonly<{ panelId: string; tabId: TabType }>,
  ) => void;
  panelId: string;
  tabId: TabType;
}>) {
  const { activeTabScrollIntoView, dispatch } = useTilesContext();
  const { draggedItemId, parentRect, setDraggedItemId, setPosition } =
    useDragHighlightContext();
  const tabRef = useRef<HTMLDivElement>(null);
  const [{ isOver }, drop] = useDrop<
    TilesPanelDragItem<TabType> | TilesPanelDragPanel,
    void,
    { isOver: boolean }
  >({
    accept: ['panel', 'tab'],
    collect(monitor) {
      return {
        isOver: monitor.isOver() && monitor.canDrop(),
      };
    },
    drop(item) {
      if (!tabRef.current) {
        return;
      }

      if (isDragTab(item)) {
        const { panelId: srcPanelId, tabId: srcTabId } = item;

        // Don't replace items with themselves.
        if (panelId === srcPanelId && tabId === srcTabId) {
          return;
        }

        onTabDrop(item, { panelId, tabId });
      } else {
        onPanelDrop(item, { panelId, tabId });
      }
    },
  });
  const [{ isDragging }, drag] = useDrag<
    TilesPanelDragItem<TabType>,
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
    if (isActive && activeTabScrollIntoView) {
      setTimeout(() => {
        // If the tab is active, scroll it into view
        tabRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
        // Add a small delay otherwise it doesn't scroll into view :/
      }, 50);
    }
  }, [activeTabScrollIntoView, isActive]);

  const setTabHoverIndicator = useCallback(() => {
    const tabRect = tabRef.current?.getBoundingClientRect();

    if (!tabRect || !parentRect) {
      return;
    }

    const { height, width } = tabRect;

    setPosition({
      height,
      left: tabRect.left - parentRect.left,
      top: tabRect.top - parentRect.top,
      width,
    });
  }, [parentRect, setPosition]);

  useEffect(() => {
    const dragId = getDragId({
      panelId,
      tabId,
    });

    if (isDragging) {
      if (draggedItemId !== dragId) {
        setDraggedItemId(dragId);
        setTabHoverIndicator();
      }
    } else if (draggedItemId === dragId) {
      setDraggedItemId(null);
    }
  }, [
    draggedItemId,
    isDragging,
    panelId,
    parentRect,
    setDraggedItemId,
    setPosition,
    setTabHoverIndicator,
    tabId,
  ]);

  useEffect(() => {
    if (isOver) {
      setTabHoverIndicator();
    }
  }, [isOver, setTabHoverIndicator]);

  const contents = (
    <>
      {Icon && <Icon className="size-4 shrink-0" />}
      {label}
      {IconSecondary && <IconSecondary className="size-4 shrink-0" />}
    </>
  );

  return (
    <div
      ref={tabRef}
      className={clsx(
        'group relative isolate flex grow items-center gap-x-0.5 rounded font-medium',
        isOver
          ? 'bg-neutral-100 dark:bg-neutral-900'
          : 'hover:bg-neutral-100 dark:hover:bg-neutral-900',
        isActive
          ? themeTextColor
          : [themeTextSubtleColor, themeTextBrandColor_Hover],
        closeable ? 'pl-2 pr-1' : 'px-2',
      )}>
      {href ? (
        <I18nLink
          className={clsx(
            'flex items-center gap-x-1.5 whitespace-nowrap text-xs',
          )}
          href={href}>
          {contents}
        </I18nLink>
      ) : (
        <TabButton
          className={clsx(
            'flex items-center gap-x-1.5 whitespace-nowrap text-xs',
            isDragging && 'invisible',
          )}
          onClick={onClick}
          onMouseDown={onClick}>
          <span aria-hidden={true} className="absolute inset-0" />
          {contents}
        </TabButton>
      )}
      {closeable && (
        <button
          className={clsx(
            'z-20 ml-1 rounded p-0.5',
            'hover:bg-neutral-200 dark:hover:bg-neutral-700',
            'text-neutral-500',
            isDragging && 'invisible',
            !isActive && 'opacity-0 focus:opacity-100 group-hover:opacity-100',
          )}
          title="Close tab"
          type="button"
          onClick={() => {
            dispatch({
              payload: {
                tabId,
              },
              type: 'tab-close',
            });
          }}>
          <RiCloseLine className="size-3 shrink-0" />
        </button>
      )}
    </div>
  );
}
