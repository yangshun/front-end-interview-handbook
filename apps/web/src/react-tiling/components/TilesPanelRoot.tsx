import type { CSSProperties, ReactNode } from 'react';

import TilesPanel from './TilesPanel';
import { useTilesContext } from '../state/useTilesContext';
import type { TilesPanelGroupDirection } from '../types';

export type Props = Readonly<{
  disablePointerEventsDuringResize?: boolean;
  getResizeHandlerProps: (direction: TilesPanelGroupDirection) => Readonly<{
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
  }>;
  getTabLabel: (tabId: string) => Readonly<{
    icon: (iconProps: React.ComponentProps<'svg'>) => JSX.Element;
    label: string;
  }>;
  onTabsClose?: (tabIds: ReadonlyArray<string>) => void;
  onTabsOpen?: (tabIds: ReadonlyArray<string>) => void;
  renderTab: (tabId: string) => JSX.Element;
}>;

export function TilesPanelRoot({
  disablePointerEventsDuringResize,
  getResizeHandlerProps,
  renderTab,
  getTabLabel,
  onTabsOpen,
  onTabsClose,
}: Props) {
  const { tiles, dispatch } = useTilesContext();

  return (
    <TilesPanel
      level={0}
      {...tiles}
      disablePointerEventsDuringResize={disablePointerEventsDuringResize}
      getResizeHandlerProps={getResizeHandlerProps}
      getTabLabel={getTabLabel}
      renderTab={renderTab}
      onAddTab={(panelId: string) => {
        dispatch({
          payload: {
            onTabsOpen,
            panelId,
          },
          type: 'tab-open',
        });
      }}
      onClose={(panelId: string) => {
        dispatch({
          payload: {
            onTabsClose,
            panelId,
          },
          type: 'panel-close',
        });
      }}
      onSplit={(direction, panelId: string) => {
        dispatch({
          payload: {
            direction,
            newPanelOrder: 'after',
            onTabsOpen,
            panelId,
          },
          type: 'panel-split',
        });
      }}
      onTabClose={(panelId: string, tabId: string) => {
        dispatch({
          payload: {
            onTabsClose,
            panelId,
            tabId,
          },
          type: 'tab-close',
        });
      }}
      onTabDrop={(src, dst) => {
        dispatch({
          payload: {
            dst,
            src,
          },
          type: 'tab-drop',
        });
      }}
      onTabSetActive={(panelId: string, tabId: string) => {
        dispatch({
          payload: {
            panelId,
            tabId,
          },
          type: 'tab-set-active',
        });
      }}
    />
  );
}
