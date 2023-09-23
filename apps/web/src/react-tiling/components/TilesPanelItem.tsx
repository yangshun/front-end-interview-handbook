import clsx from 'clsx';
import { useEffect, useRef } from 'react';
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
import type { PanelDropTarget } from '../actions/tabDrop';
import { useTilesContext } from '../state/useTilesContext';
import type { TilesPanelItemTab } from '../types';

const MAXIMUM_LEVEL_FOR_SPLITTING = 2;

export default function TilesPanelItem({
  id: panelId,
  collapsed,
  collapsible,
  defaultSize = 100,
  tabs,
  level,
  order,
  getTabLabel,
  parentDirection,
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
  collapsed?: boolean;
  collapsible?: PanelProps['collapsible'];
  defaultSize?: PanelProps['defaultSize'];
  getTabLabel: (tabId: string) => Readonly<{
    icon: (iconProps: React.ComponentProps<'svg'>) => JSX.Element;
    label: string;
  }>;
  id: string;
  level: number;
  onAddTab: (panelIdParam: string) => void;
  onClose: (panelIdParam: string) => void;
  onSplit: (
    direction: PanelGroupProps['direction'],
    panelIdParam: string,
  ) => void;
  onTabClose: (panelIdParam: string, tabId: string) => void;
  onTabDrop: (
    src: Readonly<{ panelId: string; tabCloseable: boolean; tabId: string }>,
    dst: PanelDropTarget,
  ) => void;
  onTabSetActive: (panelIdParam: string, tabId: string) => void;
  order?: number;
  parentDirection: PanelGroupProps['direction'];
  renderTab: (tabId: string) => JSX.Element;
  tabs: ReadonlyArray<TilesPanelItemTab>;
}>) {
  const ref = useRef<ImperativePanelHandle>(null);
  const { dispatch } = useTilesContext();

  useEffect(() => {
    if (!collapsible) {
      return;
    }

    if (collapsed === true) {
      ref.current?.collapse();
    }

    if (collapsed === false) {
      ref.current?.expand();
      // TODO(workspace): fix hardcoding.
      ref.current?.resize(50);
    }
  }, [collapsed, collapsible]);

  const showSplitButton = !collapsed && level <= MAXIMUM_LEVEL_FOR_SPLITTING;

  return (
    <Panel
      ref={ref}
      className={clsx(
        'flex flex-col rounded-lg',
        ['border', themeLineColor],
        themeBackgroundColor,
        ['divide-y', themeDivideColor],
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
                onAddTab(panelId);
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
          onTabClose={(tabId: string) => {
            onTabClose(panelId, tabId);
          }}
          onTabDrop={onTabDrop}
          onTabSetActive={(tabId: string) => {
            onTabSetActive(panelId, tabId);
          }}
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
              onClick={() => onSplit('horizontal', panelId)}
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
              onClick={() => onSplit('vertical', panelId)}
            />
          )}
          {collapsible &&
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
                onClose(panelId);
              }}
            />
          )}
        </div>
      </div>
      <TilesPanelBody
        hidden={collapsed}
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
