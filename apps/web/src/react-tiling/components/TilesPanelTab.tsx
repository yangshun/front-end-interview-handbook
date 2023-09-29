import clsx from 'clsx';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { RiCloseLine } from 'react-icons/ri';

import { themeTextSubtleColor } from '~/components/ui/theme';

import { I18nLink } from '~/next-i18nostic/src';

import { useTilesContext } from '../state/useTilesContext';
import type { TilesPanelDragItem } from '../types';

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
  index,
  isActive,
  label,
  panelId,
  tabId,
  onClick,
  onDrop,
}: Readonly<{
  closeable: boolean;
  href?: string;
  icon?: (iconProps: React.ComponentProps<'svg'>) => JSX.Element;
  index: number;
  isActive: boolean;
  label: string;
  onClick: () => void;
  onDrop: (
    src: Readonly<{ panelId: string; tabCloseable: boolean; tabId: TabType }>,
    dst: Readonly<{ panelId: string; tabId: TabType }>,
  ) => void;
  panelId: string;
  tabId: TabType;
}>) {
  const { dispatch } = useTilesContext();
  const tabRef = useRef<HTMLDivElement>(null);
  const [{ isOver }, drop] = useDrop<
    TilesPanelDragItem<TabType>,
    void,
    { isOver: boolean }
  >({
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
        isOver
          ? 'bg-brand-lightest dark:bg-neutral-900'
          : 'hover:bg-neutral-100 dark:hover:bg-neutral-900',
        isActive
          ? 'text-brand-dark dark:text-neutral-100'
          : themeTextSubtleColor,
        closeable ? 'pl-2 pr-1' : 'px-2',
      )}>
      {href ? (
        <I18nLink
          className={clsx('flex gap-x-1.5 whitespace-nowrap text-xs')}
          href={href}>
          {Icon && <Icon className="h-4 w-4 shrink-0" />}
          {label}
        </I18nLink>
      ) : (
        <TabButton
          className={clsx(
            'flex gap-x-1.5 whitespace-nowrap text-xs',
            isDragging && 'invisible',
          )}
          onClick={onClick}
          onMouseDown={onClick}>
          <span aria-hidden={true} className="absolute inset-0" />
          {Icon && <Icon className="h-4 w-4 shrink-0" />}
          {label}
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
                panelId,
                tabId,
              },
              type: 'tab-close',
            });
          }}>
          <RiCloseLine className="h-3 w-3 shrink-0" />
        </button>
      )}
    </div>
  );
}
