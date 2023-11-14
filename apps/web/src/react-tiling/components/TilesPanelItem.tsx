import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { RiAddLine, RiExpandLeftRightFill } from 'react-icons/ri';
import type {
  ImperativePanelHandle,
  PanelGroupProps,
  PanelProps,
} from 'react-resizable-panels';
import { Panel } from 'react-resizable-panels';

import Button from '~/components/ui/Button';
import Divider from '~/components/ui/Divider';
import {
  themeBackgroundColor,
  themeDivideColor,
  themeLineColor,
  themeTextSubtleColor,
} from '~/components/ui/theme';

import TilesPanelActions from './TilesPanelActions';
import TilesPanelBody from './TilesPanelBody';
import TilesPanelTabsSection from './TilesPanelTabsSection';
import { useDragHighlightContext } from '../state/useDragHighlightContext';
import { useTilesContext } from '../state/useTilesContext';
import type { TilesPanelItemTab } from '../types';
import getDragId from '../utils/getDragId';

const MAXIMUM_LEVEL_FOR_SPLITTING = 2;

export type TilesPanelItemMode = 'collapsed' | 'default' | 'maximized';

export default function TilesPanelItem<TabType extends string>({
  activeTabId,
  id: panelId,
  collapsed = false,
  collapsible,
  defaultSize = 100,
  fullScreen,
  tabs,
  level,
  order,
  getTabLabel,
  parentDirection,
  renderTab,
  sizeAfterExpansion,
}: Readonly<{
  activeTabId: TabType | null;
  collapsed?: boolean;
  collapsible?: PanelProps['collapsible'];
  defaultSize?: PanelProps['defaultSize'];
  fullScreen?: boolean;
  getTabLabel: (tabId: TabType) => Readonly<{
    icon?: (iconProps: React.ComponentProps<'svg'>) => JSX.Element;
    label: string;
  }>;
  id: string;
  level: number;
  order?: number;
  parentDirection: PanelGroupProps['direction'];
  renderTab: (tabId: TabType) => JSX.Element;
  sizeAfterExpansion?: number;
  tabs: ReadonlyArray<TilesPanelItemTab<TabType>>;
}>) {
  const { dispatch } = useTilesContext();
  const { setPosition, parentRect, draggedItemId, setDraggedItemId } =
    useDragHighlightContext();
  const ref = useRef<ImperativePanelHandle>(null);
  const [isPanelDragging, setIsPanelDragging] = useState(false);

  useEffect(() => {
    if (!collapsible) {
      return;
    }

    if (collapsed === true) {
      ref.current?.collapse();
    }

    if (collapsed === false) {
      ref.current?.expand();
      if (sizeAfterExpansion) {
        ref.current?.resize(sizeAfterExpansion);
      }
    }
  }, [collapsed, collapsible, sizeAfterExpansion]);

  const commonProps = {
    collapsible,
    defaultSize,
    id: panelId,
    onCollapse: (collapsedValue: boolean) =>
      dispatch({
        payload: {
          collapsed: collapsedValue,
          panelId,
        },
        type: 'panel-collapse',
      }),
    order,
    ref,
  };

  useEffect(() => {
    const panelDragId = getDragId({
      panelId,
    });

    if (isPanelDragging) {
      const panelRect = panelRef.current?.getBoundingClientRect();

      if (panelRect && parentRect && draggedItemId !== panelDragId) {
        const { width, height } = panelRect;

        setPosition({
          height,
          left: panelRect.left - parentRect.left,
          top: panelRect.top - parentRect.top,
          width,
        });
        setDraggedItemId(panelDragId);
      }
    } else if (draggedItemId === panelDragId) {
      setDraggedItemId(null);
    }
  }, [
    draggedItemId,
    isPanelDragging,
    panelId,
    parentRect,
    setDraggedItemId,
    setPosition,
  ]);

  const mode: TilesPanelItemMode = (() => {
    if (fullScreen) {
      return 'maximized';
    }

    if (collapsible && collapsed) {
      return 'collapsed';
    }

    return 'default';
  })();

  const panelRef = useRef<HTMLDivElement>(null);

  if (parentDirection === 'horizontal' && mode === 'collapsed') {
    return (
      <Panel
        {...commonProps}
        className={clsx(
          'flex flex-col items-stretch rounded-lg py-2',
          ['border', themeLineColor],
          themeBackgroundColor,
        )}
        collapsedSize={5}>
        <div className="flex justify-center">
          <Button
            icon={RiExpandLeftRightFill}
            isLabelHidden={true}
            label="Expand"
            size="lg"
            variant="tertiary"
            onClick={() => {
              dispatch({
                payload: {
                  collapsed: false,
                  panelId,
                },
                type: 'panel-collapse',
              });
            }}
          />
        </div>
        <Divider className="my-2" />
        <div className="flex flex-col items-center gap-y-4">
          {tabs.map((tabItem) => {
            const { icon, label } = getTabLabel(tabItem.id);

            return (
              <Button
                key={tabItem.id}
                className={themeTextSubtleColor}
                href={tabItem.href}
                icon={icon}
                isLabelHidden={true}
                label={label}
                size="lg"
                variant="tertiary"
                onClick={() => {
                  dispatch({
                    payload: {
                      panelId,
                      tabId: tabItem.id,
                    },
                    type: 'tab-set-active',
                  });
                }}
              />
            );
          })}
        </div>
      </Panel>
    );
  }

  const showSplitButton =
    mode === 'default' && level <= MAXIMUM_LEVEL_FOR_SPLITTING;

  return (
    <Panel
      {...commonProps}
      className={clsx(
        'rounded-lg',
        ['border', themeLineColor],
        themeBackgroundColor,
        ['divide-y', themeDivideColor],
        fullScreen && 'absolute inset-0 z-20',
      )}
      collapsedSize={5}>
      <div ref={panelRef} className="flex h-full w-full flex-col">
        <div
          className={clsx(
            'flex shrink-0 items-center justify-between px-2',
            collapsed ? 'h-full' : 'h-10',
          )}>
          {!collapsed && (
            <span className={clsx('flex h-full items-center pr-0.5')}>
              <Button
                icon={RiAddLine}
                isLabelHidden={true}
                label="New tab"
                size="xs"
                tooltip="New tab"
                variant="tertiary"
                onClick={() => {
                  dispatch({
                    payload: {
                      panelId,
                    },
                    type: 'tab-open',
                  });
                }}
              />
            </span>
          )}
          <TilesPanelTabsSection
            activeTabId={activeTabId}
            getTabLabel={getTabLabel}
            mode={collapsed ? 'readonly' : 'interactive'}
            panelId={panelId}
            tabs={tabs}
          />
          <div className="flex h-full items-center">
            <TilesPanelActions
              closeable={tabs.every((tab) => tab.closeable)}
              mode={mode}
              panelId={panelId}
              parentDirection={parentDirection}
              showSplitButton={showSplitButton}
            />
          </div>
        </div>
        <TilesPanelBody
          allowDropping={!fullScreen}
          hidden={collapsed}
          panelId={panelId}
          tabs={tabs}
          onPanelDrop={(dropAreaSection, src) => {
            dispatch({
              payload: {
                dst: {
                  dropAreaSection,
                  panelId,
                },
                srcPanelId: src.panelId,
              },
              type: 'panel-drop',
            });
          }}
          onTabDrop={(dropAreaSection, src) => {
            dispatch({
              payload: {
                dst: {
                  dropAreaSection,
                  panelId,
                },
                src,
              },
              type: 'tab-drop',
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
      </div>
    </Panel>
  );
}
