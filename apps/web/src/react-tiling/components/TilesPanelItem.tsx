import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import { LuExpand, LuShrink } from 'react-icons/lu';
import {
  RiAddLine,
  RiCloseLine,
  RiContractLeftRightFill,
  RiContractUpDownFill,
  RiExpandLeftRightFill,
  RiExpandUpDownFill,
} from 'react-icons/ri';
import { VscSplitHorizontal, VscSplitVertical } from 'react-icons/vsc';
import type {
  ImperativePanelHandle,
  PanelGroupProps,
  PanelProps,
} from 'react-resizable-panels';
import { Panel } from 'react-resizable-panels';

import Button from '~/components/ui/Button';
import {
  themeBackgroundColor,
  themeDivideColor,
  themeLineColor,
} from '~/components/ui/theme';

import TilesPanelBody from './TilesPanelBody';
import TilesPanelTabsSection from './TilesPanelTabsSection';
import { useTilesContext } from '../state/useTilesContext';
import type { TilesPanelItemTab } from '../types';

const MAXIMUM_LEVEL_FOR_SPLITTING = 2;

export default function TilesPanelItem({
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
  activeTabId: string | null;
  collapsed?: boolean;
  collapsible?: PanelProps['collapsible'];
  defaultSize?: PanelProps['defaultSize'];
  fullScreen?: boolean;
  getTabLabel: (tabId: string) => Readonly<{
    icon: (iconProps: React.ComponentProps<'svg'>) => JSX.Element;
    label: string;
  }>;
  id: string;
  level: number;
  order?: number;
  parentDirection: PanelGroupProps['direction'];
  renderTab: (tabId: string) => JSX.Element;
  sizeAfterExpansion?: number;
  tabs: ReadonlyArray<TilesPanelItemTab>;
}>) {
  const { dispatch } = useTilesContext();
  const ref = useRef<ImperativePanelHandle>(null);

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

  const showSplitButton =
    !fullScreen && !collapsed && level <= MAXIMUM_LEVEL_FOR_SPLITTING;

  return (
    <Panel
      ref={ref}
      className={clsx(
        'flex flex-col rounded-lg',
        ['border', themeLineColor],
        themeBackgroundColor,
        ['divide-y', themeDivideColor],
        fullScreen && 'absolute inset-0 z-20',
      )}
      collapsedSize={5}
      collapsible={collapsible}
      defaultSize={defaultSize}
      id={panelId}
      order={order}
      onCollapse={(collapsedValue) => {
        dispatch({
          payload: {
            collapsed: collapsedValue,
            panelId,
          },
          type: 'panel-collapse',
        });
      }}>
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
          {showSplitButton && parentDirection === 'horizontal' && (
            <Button
              icon={VscSplitHorizontal}
              isLabelHidden={true}
              label="Split right"
              size="xs"
              tooltip="Split right"
              variant="tertiary"
              onClick={() =>
                dispatch({
                  payload: {
                    direction: 'horizontal',
                    newPanelOrder: 'after',
                    panelId,
                  },
                  type: 'panel-split',
                })
              }
            />
          )}
          {showSplitButton && parentDirection === 'vertical' && (
            <Button
              icon={VscSplitVertical}
              isLabelHidden={true}
              label="Split down"
              size="xs"
              tooltip="Split down"
              variant="tertiary"
              onClick={() =>
                dispatch({
                  payload: {
                    direction: 'vertical',
                    newPanelOrder: 'after',
                    panelId,
                  },
                  type: 'panel-split',
                })
              }
            />
          )}
          {(!collapsible || (collapsible && !collapsed)) &&
            (fullScreen ? (
              <Button
                icon={LuShrink}
                isLabelHidden={true}
                label="Shrink"
                size="xs"
                variant="tertiary"
                onClick={() => {
                  dispatch({
                    payload: {
                      fullScreen: false,
                      panelId,
                    },
                    type: 'panel-full-screen',
                  });
                }}
              />
            ) : (
              <Button
                icon={LuExpand}
                isLabelHidden={true}
                label="Expand"
                size="xs"
                variant="tertiary"
                onClick={() => {
                  dispatch({
                    payload: {
                      fullScreen: true,
                      panelId,
                    },
                    type: 'panel-full-screen',
                  });
                }}
              />
            ))}
          {!fullScreen &&
            collapsible &&
            (collapsed ? (
              <Button
                icon={
                  parentDirection === 'vertical'
                    ? RiExpandUpDownFill
                    : RiExpandLeftRightFill
                }
                isLabelHidden={true}
                label="Expand"
                size="xs"
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
            ) : (
              <Button
                icon={
                  parentDirection === 'vertical'
                    ? RiContractUpDownFill
                    : RiContractLeftRightFill
                }
                isLabelHidden={true}
                label="Collapse"
                size="xs"
                variant="tertiary"
                onClick={() => {
                  dispatch({
                    payload: {
                      collapsed: true,
                      panelId,
                    },
                    type: 'panel-collapse',
                  });
                }}
              />
            ))}
          {tabs.every((tab) => tab.closeable) && (
            <Button
              icon={RiCloseLine}
              isLabelHidden={true}
              label="Close all tabs"
              size="xs"
              tooltip="Close all tabs"
              variant="tertiary"
              onClick={() => {
                dispatch({
                  payload: {
                    panelId,
                  },
                  type: 'panel-close',
                });
              }}
            />
          )}
        </div>
      </div>
      <TilesPanelBody
        allowDropping={!fullScreen}
        hidden={collapsed}
        panelId={panelId}
        tabs={tabs}
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
    </Panel>
  );
}
