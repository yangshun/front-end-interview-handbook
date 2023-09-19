import clsx from 'clsx';
import { RiAddLine, RiCloseLine } from 'react-icons/ri';
import { VscSplitHorizontal } from 'react-icons/vsc';
import { Panel } from 'react-resizable-panels';

import {
  themeBackgroundColor,
  themeDivideColor,
  themeIconColor,
  themeLineColor,
} from '~/components/ui/theme';

import TilesPanelBody from './TilesPanelBody';
import TilesPanelTabsSection from './TilesPanelTabsSection';
import type { PanelDropTarget } from '../actions/tabDrop';
import type { TilesPanelGroupDirection, TilesPanelItemTab } from '../types';

export default function TilesPanelItem({
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
  getTabLabel: (tabId: string) => Readonly<{
    icon: (iconProps: React.ComponentProps<'svg'>) => JSX.Element;
    label: string;
  }>;
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
      className={clsx(
        'flex flex-col rounded-lg',
        ['border', themeLineColor],
        themeBackgroundColor,
        ['divide-y', themeDivideColor],
      )}
      defaultSize={defaultSize}
      id={panelId}
      order={order}>
      <div className="flex h-10 shrink-0 items-center justify-between">
        <span className="flex h-full items-center pl-2 pr-0.5">
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
            className="rounded p-0.5 hover:bg-neutral-900"
            title="Split editor right"
            type="button"
            onClick={() => onSplit('horizontal', panelId)}>
            <VscSplitHorizontal
              className={clsx('h-4 w-4 shrink-0', themeIconColor)}
            />
          </button>
          {tabs.every((tab) => tab.closeable) && (
            <button
              className="rounded p-0.5 hover:bg-neutral-900"
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
