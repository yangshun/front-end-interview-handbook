import clsx from 'clsx';
import { RiAddLine, RiCloseLine } from 'react-icons/ri';
import { VscSplitHorizontal } from 'react-icons/vsc';
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
      <div className="flex h-10 shrink-0 items-center justify-between px-2">
        <span className="flex h-full items-center pr-0.5">
          <Button
            icon={RiAddLine}
            isLabelHidden={true}
            label="New tab"
            size="xs"
            variant="tertiary"
            onClick={() => {
              onAddTab(panelId);
            }}
          />
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
        <div className="flex h-full items-center">
          <Button
            icon={VscSplitHorizontal}
            isLabelHidden={true}
            label="Split editor right"
            size="xs"
            variant="tertiary"
            onClick={() => onSplit('horizontal', panelId)}
          />
          {tabs.every((tab) => tab.closeable) && (
            <Button
              icon={RiCloseLine}
              isLabelHidden={true}
              label="Close all tabs"
              size="xs"
              variant="tertiary"
              onClick={() => {
                onClose(panelId);
              }}
            />
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
